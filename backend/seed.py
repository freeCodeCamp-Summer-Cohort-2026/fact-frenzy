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
                    "content": "Every country has something that makes it stand out — a record, a tradition, or a different way of doing things. Some countries have unusual customs that may seem surprising to outsiders. Others are known for natural features, inventions, or remarkable achievements. How much do you know about what makes different countries unique?",
                    "prompt": "Match each country to its highlight.",
                    "matching_pairs": [
                        ("Ethiopia", "Has a 13-month calendar"),
                        (
                            "Russia",
                            "Spans 11 time zones, more than any other country's contiguous territory",
                        ),
                        ("Japan", "Made up of over 6,000 islands"),
                        ("Colombia", "Home to vallenato music"),
                    ],
                },
                {
                    "title": "Match Capitals",
                    "content": "A country's capital isn't always its biggest or best-known city. Some capitals were chosen for historical, political, or geographical reasons. Around the world, capital cities can have stories that are just as interesting as the countries they represent.",
                    "prompt": "Match each capital to its country.",
                    "matching_pairs": [
                        ("Astana", "Kazakhstan"),
                        ("Naypyidaw", "Myanmar"),
                        ("Sri Jayawardenepura Kotte", "Sri Lanka"),
                        ("Baku", "Azerbaijan"),
                    ],
                },
            ],
        },
        {
            "module_title": "Continents",
            "tutorials": [
                {
                    "title": "What Belongs Where?",
                    "content": "Every continent has famous rivers and mountain ranges that help define it. Some waterways stretch across enormous distances and have shaped civilizations for thousands of years. Mountain ranges can influence climate, wildlife, and even where people live.",
                    "prompt": "Match each landmark to the continent it belongs to.",
                    "matching_pairs": [
                        ("Congo River", "Africa"),
                        ("Sagarmatha", "Asia"),
                        ("Amazon Rainforest", "South America"),
                        ("The Alps", "Europe"),
                    ],
                },
                {
                    "title": "Continent Extremes",
                    "content": "There are seven continents on Earth, and each one has its own remarkable extremes. Some stand out because of their size or geography, while others have unusual climates or population patterns. Which continent holds which surprising record?",
                    "prompt": "Match each continent to its extreme.",
                    "matching_pairs": [
                        ("Asia", "Largest and most populated continent"),
                        ("Antarctica", "No permanent residents"),
                        ("Australia", "Flattest continent"),
                        (
                            "Africa",
                            "Only continent spanning all four hemispheres",
                        ),
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
                    "content": "Your body contains organs that perform incredibly different jobs, often without you noticing. Many of them work around the clock to keep you alive and balanced. Some organs even perform several important tasks at once.",
                    "prompt": "Match each organ or body part to its function.",
                    "matching_pairs": [
                        (
                            "Adult Human Skeleton",
                            "Supports the body and protects organs; made up of 206 bones",
                        ),
                        (
                            "Lung",
                            "Helps exchange gases; one of two respiratory organs containing alveoli",
                        ),
                        (
                            "Small Intestine",
                            "Absorbs most nutrients from digested food",
                        ),
                        (
                            "Spinal Cord",
                            "Carries signals between the brain and body",
                        ),
                    ],
                },
                {
                    "title": "Organs by System",
                    "content": "Organs don't work alone — they team up in systems. These systems constantly communicate and cooperate to keep your body functioning. A problem in one part can sometimes affect several others, showing just how connected the human body is.",
                    "prompt": "Match each body system to an organ that belongs to it.",
                    "matching_pairs": [
                        ("Lymphatic System", "Spleen"),
                        ("Urinary System", "Kidneys"),
                        ("Digestive and Endocrine Systems", "Pancreas"),
                        ("Integumentary System", "Skin"),
                    ],
                },
            ],
        },
        {
            "module_title": "Animal Adaptations",
            "tutorials": [
                {
                    "title": "Animals & Habitats",
                    "content": "Animals live in environments ranging from scorching deserts to freezing polar regions. Their bodies and behaviors often reflect the challenges of the places they inhabit. Some animals can survive conditions that would be extremely difficult for humans.",
                    "prompt": "Match each habitat to the animal that calls it home.",
                    "matching_pairs": [
                        (
                            "Deserts and Semi-Deserts of Southern Africa",
                            "Meerkat",
                        ),
                        ("Madagascar's Dry Forests", "Fossa"),
                        (
                            "Tropical Rainforests of Central and South America",
                            "Sloth",
                        ),
                        (
                            "Temperate Coasts of Southern Australia",
                            "Leafy Seadragon",
                        ),
                    ],
                },
                {
                    "title": "Adaptations & Survival",
                    "content": "Animals have evolved some truly surprising ways to survive. Some adaptations help them find food, avoid predators, or cope with harsh environments. Others are so unusual that they can completely change what you might expect from an animal.",
                    "prompt": "Match each animal to its adaptation.",
                    "matching_pairs": [
                        ("Platypus", "One of the few mammals that lays eggs"),
                        ("Camel", "Stores fat in its hump"),
                        (
                            "Narwhal",
                            "Uses its thick blubber to stay warm in freezing Arctic waters",
                        ),
                        (
                            "Fennec Fox",
                            "Relies on its large ears to release heat in the Sahara Desert",
                        ),
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

                # We have only matching activity for each tutorial
                activity = Activity(
                    tutorial_id=tutorial.id,
                    type="matching",
                    prompt=tut_data["prompt"],
                )

                session.add(activity)
                session.commit()
                session.refresh(activity)

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

                tutorial_count += 1

    print(f"Seeded {tutorial_count} tutorials.")


if __name__ == "__main__":
    seed()
