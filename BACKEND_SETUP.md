# Backend setup for auth (fix 404 / "Failed to fetch")

The frontend runs on **http://localhost:3000** and calls your backend at **http://127.0.0.1:8000**. That is a **cross-origin** request, so:

1. **CORS** must be enabled on the backend so the browser allows the request.
2. The backend must expose the routes the frontend expects: **POST /login** and **POST /signup** (or another path you set).

## 1. Enable CORS (FastAPI example)

If your backend is FastAPI (Uvicorn), add this near the top of your app, **before** your routes:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# your routes (e.g. /login, /signup)...
```

Restart the backend after adding this. The browser sends an **OPTIONS** request first; CORS middleware will respond to that and allow the actual **POST** request.

## 2. Expose the signup route

The frontend calls **POST /signup** with JSON body: `{ "email": "...", "password": "..." }`.

If your backend uses a **different path** (e.g. `/register` or `/auth/signup`), set it in the frontend:

In **`.env.local`** in the frontend project:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SIGNUP_PATH=/register
```

Use the path your backend actually has. If you add a `/signup` route on the backend, you don’t need `NEXT_PUBLIC_SIGNUP_PATH`.

## 3. Optional: signup endpoint example (FastAPI)

```python
@app.post("/signup")
def signup(data: dict):  # or use a Pydantic model
    email = data.get("email")
    password = data.get("password")
    # create user, then return token or success message
    return {"token": "your-jwt-or-session-token", "email": email}
```

After fixing CORS and having a signup route, sign up from the frontend should work.
