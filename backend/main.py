from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def main():
    return{"Hello from backend!"}


if __name__ == "__main__":
    main()
