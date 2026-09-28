from sqlmodel import Session, select

from app.core.security import hash_password
from app.database import create_db_table, engine
from app.models import (
    Activity,
    Category,
    Lab,
    Module,
    Option,
    Question,
    Tutorial,
    User,
)

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
        seed_tutorials(session)


# Content structure for Labs:  category (topic) name -> module title -> lab content
# Each module has one lab (its "Challenge"), which has a matching activity
# and a sorting activity. This is draft content which will be refined once tutorial
# content is finalized.

LAB_CONTENT = {
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

    for category_name, modules in LAB_CONTENT.items():
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


TUTORIAL_CONTENT = {
    "Geography": [
        {
            "module_title": "Countries & Capitals",
            "tutorials": [
                {
                    "title": "Country Highlights",
                    "content": "Every country has something that makes it stand out: a record, a quirky tradition, or a different way of doing things. Japan is an archipelago of thousands of islands, and Ethiopia even uses its own calendar. Let's see which highlights are true.",
                    "type": "sorting",
                    "prompt": "Sort each fact into True or Untrue.",
                    "sorting_facts": [
                        ("Japan is made up of more than 6,000 islands.", True),
                        ("Ethiopia's calendar has 13 months.", True),
                        (
                            "The Great Pyramid of Giza is the tallest man-made structure in the world today.",
                            False,
                        ),
                    ],
                },
                {
                    "title": "Match Capitals",
                    "content": "A country's capital isn't always its biggest or best-known city. Nigeria's largest city is Lagos, but its capital is Abuja, and Canada's capital is Ottawa, not Toronto. Some countries even move their capitals on purpose. Match each country to its capital.",
                    "type": "matching",
                    "prompt": "Match each country to its capital.",
                    "matching_pairs": [
                        ("Canada", "Ottawa"),
                        ("Nigeria", "Abuja"),
                        ("Peru", "Lima"),
                        ("Poland", "Warsaw"),
                    ],
                },
            ],
        },
        {
            "module_title": "Continents",
            "tutorials": [
                {
                    "title": "What Belongs Where?",
                    "content": "Every continent has famous rivers and mountain ranges that help define it. The Nile flows through northeastern Africa, while the Andes run along the western edge of South America. Match each landmark to its continent.",
                    "type": "matching",
                    "prompt": "Match each landmark to its continent.",
                    "matching_pairs": [
                        ("Nile River", "Africa"),
                        ("Ganges River", "Asia"),
                        ("Andes Mountains", "South America"),
                        ("Danube River", "Europe"),
                    ],
                },
                {
                    "title": "Continent Extremes",
                    "content": "Continents hold some of the planet's biggest records. Asia is enormous, Antarctica is remarkably empty, and Africa is home to fast-growing cities. Let's sort a few extreme facts.",
                    "type": "sorting",
                    "prompt": "Sort each fact into True or Untrue.",
                    "sorting_facts": [
                        (
                            "Asia is both the largest and the most populated continent.",
                            True,
                        ),
                        (
                            "Africa has the largest population of any continent.",
                            False,
                        ),
                        ("Antarctica has no permanent residents.", True),
                    ],
                },
            ],
        },
    ],
    "Biology": [
        {
            "module_title": "Human Body",
            "tutorials": [
                {
                    "title": "Organs & Functions",
                    "content": "Every organ has a specific job. Your liver produces bile to help digest fats, and your lungs bring oxygen into your blood. Let's test what you know about a few organs.",
                    "type": "sorting",
                    "prompt": "Sort each fact into True or Untrue.",
                    "sorting_facts": [
                        ("The liver produces bile to help digest fats.", True),
                        (
                            "Most nutrient absorption happens in the stomach.",
                            False,
                        ),
                        (
                            "Humans have two lungs, and the left one is slightly smaller than the right.",
                            True,
                        ),
                    ],
                },
                {
                    "title": "Organs by System",
                    "content": "Organs don't work alone. They team up in systems. The brain leads the nervous system, and the trachea carries air as part of the respiratory system. Match each organ to its system.",
                    "type": "matching",
                    "prompt": "Match each organ to its body system.",
                    "matching_pairs": [
                        ("Trachea", "Respiratory System"),
                        ("Bladder", "Urinary System"),
                        ("Stomach", "Digestive System"),
                        ("Brain", "Nervous System"),
                    ],
                },
            ],
        },
        {
            "module_title": "Animal Adaptations",
            "tutorials": [
                {
                    "title": "Animals & Habitats",
                    "content": "Animals are built for the places they live. Thick fur helps polar bears survive freezing Arctic conditions, while meerkats thrive in dry desert environments. Match each animal to its habitat.",
                    "type": "matching",
                    "prompt": "Match each animal to its habitat.",
                    "matching_pairs": [
                        ("Meerkat", "Desert"),
                        ("Polar Bear", "Arctic"),
                        ("Poison Dart Frog", "Rainforest"),
                        ("Sea Otter", "Coastal Waters"),
                    ],
                },
                {
                    "title": "Adaptations & Survival",
                    "content": "Animals have some surprising survival tricks, and some mammals break the usual rules. Let's sort a few facts about how animals adapt.",
                    "type": "sorting",
                    "prompt": "Sort each fact into True or Untrue.",
                    "sorting_facts": [
                        ("Platypuses are mammals that lay eggs.", True),
                        ("A camel's hump is filled with water.", False),
                        ("Bats are completely blind.", False),
                    ],
                },
            ],
        },
    ],
}


def seed_tutorials(session: Session) -> None:
    tutorial_count = 0

    for category_name, modules in TUTORIAL_CONTENT.items():
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

            for tut_data in module_data["tutorials"]:
                existing_tutorial = session.exec(
                    select(Tutorial).where(Tutorial.title == tut_data["title"])
                ).first()

                if existing_tutorial:
                    continue

                tutorial = Tutorial(
                    title=tut_data["title"],
                    description=None,
                    module_id=module.id,
                    content=tut_data["content"],
                )
                session.add(tutorial)
                session.commit()
                session.refresh(tutorial)

                activity = Activity(
                    tutorial_id=tutorial.id,
                    type=tut_data["type"],
                    prompt=tut_data["prompt"],
                )

                session.add(activity)
                session.commit()
                session.refresh(activity)

                if tut_data["type"] == "matching":
                    for item, match in tut_data["matching_pairs"]:
                        question = Question(activity_id=activity.id, text=item)
                        session.add(question)
                        session.commit()
                        session.refresh(question)

                        session.add(
                            Option(
                                question_id=question.id,
                                text=match,
                                is_correct=True,
                            )
                        )
                        session.commit()
                else:  # for sorting
                    for text, is_true in tut_data["sorting_facts"]:
                        question = Question(activity_id=activity.id, text=text)
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

                tutorial_count += 1

    print(f"Seeded {tutorial_count} tutorials.")


if __name__ == "__main__":
    seed()
