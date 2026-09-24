from sqlmodel import Session, select

from app.core.security import hash_password
from app.database import create_db_table, engine
from app.models import Activity, Category, Lab, Module, Option, Question, User

SEED_PASSWORD = "dev-password123"  # Default password for seeded users

USERS = [
    {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "is_admin": True,
    },
    {
        "name": "Bob Smith",
        "email": "b.smith@testcorp.net",
        "is_admin": False,
    },
    {
        "name": "Charlie Brown",
        "email": "charlie_b@mail.org",
        "is_admin": False,
    },
    {
        "name": "Dana",
        "email": "dana@fastapi.io",
        "is_admin": False,
    },
    {
        "name": "Dr. Evelyn Reed-Jones",
        "email": "evelyn.rj@research.edu",
        "is_admin": True,
    },
]


def seed() -> None:
    create_db_table()

    with Session(engine) as session:
        for data in USERS:
            existing_user = session.exec(
                select(User).where(User.email == data["email"])
            ).first()

            if existing_user:
                continue

            password_hash = hash_password(SEED_PASSWORD)
            user = User(**data, password_hash=password_hash)
            session.add(user)

        session.commit()
        print(f"Seeded {len(USERS)} users.")

        seed_labs(session)


# Content structure for Labs:  category (topic) name -> module title -> lab content
# Each module has one lab (its "Challenge"), which has a matching activity
# and a sorting activity. This is draft content which will be refined once tutorial
# content is finalized.

MODULE_CONTENT = {
    "Geography": [
        {
            "module_title": "Countries & Capitals",
            "lab": {
                "title": "Country Challenge",
                "description": "Match countries to their capitals, and sort true vs. untrue facts.",
                "matching_prompt": "Match each country to its capital.",
                "matching_pairs": [
                    ("Kazakhstan", "Astana"),
                    ("Myanmar", "Naypyidaw"),
                    ("Sri Lanka", "Sri Jayawardenepura Kotte"),
                    ("Azerbaijan", "Baku"),
                ],
                "sorting_prompt": "Sort each fact into True or Untrue.",
                "sorting_facts": [
                    (
                        "Ethiopia follows a calendar that is about 7–8 years behind the Gregorian calendar and has 12 months.",
                        False,
                    ),
                    (
                        "Russia spans more time zones than any other country's contiguous territory. At the same moment, it can be morning in one part of Russia and night in another.",
                        True,
                    ),
                ],
            },
        },
        {
            "module_title": "Continents",
            "lab": {
                "title": "World Explorer",
                "description": "Match continents to their notable landmarks, and sort true vs. untrue facts.",
                "matching_prompt": "Match each continent to a notable landmark.",
                "matching_pairs": [
                    ("Africa", "Congo Basin Rainforest"),
                    ("Asia", "Mount Everest"),
                    ("South America", "Amazon River"),
                    ("Europe", "The Alps"),
                ],
                "sorting_prompt": "Sort each fact into True or Untrue.",
                "sorting_facts": [
                    ("Asia is the largest continent by land area.", True),
                    ("Europe is the least-populated continent.", False),
                ],
            },
        },
    ],
    "Biology": [
        {
            "module_title": "Human Body",
            "lab": {
                "title": "Organize the Human Body",
                "description": "Match organs to their body system, and sort true vs. untrue facts.",
                "matching_prompt": "Match each organ to its body system.",
                "matching_pairs": [
                    ("Alveoli", "Respiratory System"),
                    ("Kidneys", "Urinary System"),
                    ("Small Intestine", "Digestive System"),
                    ("Spinal Cord", "Nervous System"),
                ],
                "sorting_prompt": "Sort each fact into True or Untrue.",
                "sorting_facts": [
                    ("The human body has 206 bones as an adult.", True),
                    ("Humans have four lungs.", False),
                ],
            },
        },
        {
            "module_title": "Animal Adaptations",
            "lab": {
                "title": "Animal Survival Challenge",
                "description": "Match animals to their habitat, and sort true vs. untrue facts.",
                "matching_prompt": "Match each animal to its habitat.",
                "matching_pairs": [
                    ("Fennec Fox", "Sahara Desert"),
                    ("Narwhal", "Arctic Ocean"),
                    ("Sloth", "Tropical Rainforest"),
                    ("Leafy Seadragon", "Temperate Coast"),
                ],
                "sorting_prompt": "Sort each fact into True or Untrue.",
                "sorting_facts": [
                    ("All mammals lay eggs.", False),
                    ("Camels store fat, not water, in their humps.", True),
                ],
            },
        },
    ],
}


def seed_labs(session: Session) -> None:
    lab_count = 0

    for category_name, modules in MODULE_CONTENT.items():
        category = session.exec(
            select(Category).where(Category.name == category_name)
        ).first()

        if category is None:
            category = Category(name=category_name)
            session.add(category)
            session.commit()
            session.refresh(category)

        for module_data in modules:
            module = session.exec(
                select(Module).where(
                    Module.title == module_data["module_title"]
                )
            ).first()

            if module is None:
                module = Module(
                    title=module_data["module_title"],
                    category_id=category.id,
                )
                session.add(module)
                session.commit()
                session.refresh(module)

            lab_data = module_data["lab"]

            existing_lab = session.exec(
                select(Lab).where(Lab.title == lab_data["title"])
            ).first()

            if existing_lab:
                continue

            lab = Lab(
                title=lab_data["title"],
                description=lab_data["description"],
                module_id=module.id,
            )
            session.add(lab)
            session.commit()
            session.refresh(lab)

            # Matching activity
            matching_activity = Activity(
                lab_id=lab.id,
                type="matching",
                prompt=lab_data["matching_prompt"],
            )
            session.add(matching_activity)
            session.commit()
            session.refresh(matching_activity)

            for item, match in lab_data["matching_pairs"]:
                question = Question(
                    activity_id=matching_activity.id, text=item
                )

                session.add(question)
                session.commit()
                session.refresh(question)

                session.add(
                    Option(
                        question_id=question.id, text=match, is_correct=True
                    )
                )  # we only ever create one Option per Question — the correct match (e.g., Question "Kazakhstan" → Option "Astana")
                # There's no separate "wrong" Option stored in the database for matching pairs that's why it's 'is_correct=True' here
                session.commit()

            # sorting activity
            sorting_activity = Activity(
                lab_id=lab.id,
                type="sorting",
                prompt=lab_data["sorting_prompt"],
            )
            session.add(sorting_activity)
            session.commit()
            session.refresh(sorting_activity)

            for text, is_true in lab_data["sorting_facts"]:
                question = Question(activity_id=sorting_activity.id, text=text)
                session.add(question)
                session.commit()
                session.refresh(question)

                session.add_all(
                    [
                        Option(
                            question_id=question.id,
                            text="True",
                            is_correct=is_true,
                        ),
                        Option(
                            question_id=question.id,
                            text="Untrue",
                            is_correct=not is_true,
                        ),
                    ]
                )

                session.commit()

            lab_count += 1

    print(f"Seeded {lab_count} labs.")


if __name__ == "__main__":
    seed()
