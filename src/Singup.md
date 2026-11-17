# Frontend Auth & API — Signup, Login, ConexApiClient, ConexTypes

How the frontend creates users, logs them in, calls the backend, and types the responses.

---

## 1. How the pieces connect

```
AuthForm.tsx              App.tsx                   ConexApiClient.ts
(signup / login)          (session tracking)        (API calls)
     │                         │                         │
     │ supabase.auth.signUp    │ onAuthStateChange       │ reads token
     │ supabase.auth.signIn    │ getSession              │ from session
     ▼                         ▼                         ▼
  supabase-js  ────────►  localStorage  ────────►  FastAPI /tasklist
                                                    (validates JWT, RLS)
```

| File | What it does |
|---|---|
| `AuthForm.tsx` | Creates users (`signUp`) and logs them in (`signInWithPassword`) via Supabase Auth. **Never sends the role.** |
| `App.tsx` | Knows who is logged in. Redirects `/create-account` → `/dashboard` when a session exists (see `auth/Guards.tsx`). |
| `ConexApiClient.ts` | Wraps `fetch` with the `Authorization: Bearer <jwt>` header. Throws on non-2xx responses. |
| `ConexTypes.ts` | Pure `type` declarations mirroring the database tables. No runtime code. |

---

## 2. Signup

### What the user does

On `/create-account`, switches to the **Signup** tab, fills in first name, last name, email, password, clicks **Sign up**.

### What the code does

```tsx
// AuthForm.tsx — signup branch of onSubmit
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      first_name: firstName,
      last_name: lastName,
    },
  },
});
```

That call does three things **on the Supabase side**:

1. Inserts a row into `auth.users` with `raw_user_meta_data = { first_name, last_name, ... }`.
2. Runs your Postgres trigger `handle_new_user` (BEFORE INSERT on `auth.users`), which sets `raw_app_meta_data.role` — this is where `'RSL'` / `'customer'` / `'admin'` comes from. **Not the client.**
3. Returns a `session` (email confirmation off) **or** just the `user` (email confirmation on).

### Client-side result

| Email confirmation | `data.session` | What happens |
|---|---|---|
| **Off** (dev default) | session object | `supabase-js` stores it in `localStorage`. `App.tsx` sees it and redirects `/create-account` → `/dashboard`. User is logged in immediately. |
| **On** (production) | `null` | User must click the confirmation link in their inbox before they can log in. No redirect happens. The form shows `a.notice` ("check your email"). |

### What the client **does not** send

- **Never sends the role.** `app_metadata` is written by the DB trigger, not the client. If the client could set it, any user could make themselves `admin`.
- **Never sends a password hash.** Supabase Auth stores the hash in `auth.users.encrypted_password` — invisible to the client.

### Password rules

- The input has `minLength={6}` (Supabase's default minimum).
- Stricter password policies (if you enable them in the dashboard) are enforced server-side regardless of the client.

---

## 3. Login

### What the user does

Same page, **Login** tab: email + password + **Log in**.

### What the code does

```tsx
// AuthForm.tsx — login branch of onSubmit
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

### Outcomes

| Result | `error` | What the UI shows |
|---|---|---|
| Valid credentials | `null` | Redirect to `/dashboard` (see below) |
| Wrong password / unknown email | `Invalid login credentials` | Inline error (`role="alert"`) |
| Email not confirmed | `Email not confirmed` | Inline error |
| Too many attempts | `Email rate limit exceeded` | Inline error |

### Three states in the form

| State | Purpose |
|---|---|
| `loading` | Disables the submit button — prevents double submits |
| `error` | Holds the Supabase error message, shown in red under the button |
| `submitted` | Shows `a.notice` when `error` is `null` |

### The redirect is **not** in the form

The form never calls `navigate("/")`. The redirect is handled by `AuthProvider` + `GuestOnly`:

```tsx
// App.tsx — session tracking
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
    setLoading(false);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => setSession(session),
  );

  return () => subscription.unsubscribe();
}, []);

// App.tsx — Layout
// auth/Guards.tsx: <GuestOnly /> sends anyone with a session to /dashboard
```

Flow when login succeeds:

1. `signInWithPassword` returns success.
2. `supabase-js` fires `SIGNED_IN`.
3. `onAuthStateChange` handler calls `setSession(newSession)`.
4. `Layout` re-renders, sees `session` truthy and `pathname === "/create-account"`.
5. `GuestOnly` returns `<Navigate to="/dashboard" replace />`.

**If the redirect stops working, the bug is in `auth/`, not `AuthForm.tsx`.**

---

## 4. ConexApiClient.ts

### Purpose

A thin wrapper around `fetch` that:

- Reads the current Supabase session.
- Injects `Authorization: Bearer <access_token>`.
- Sets `Content-Type: application/json`.
- Throws `Error` on any non-2xx response, with the backend's `detail` message.

### The function

```ts
// src/api/ConexApiClient.ts
import { supabase } from "../supabaseClient";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export async function ConexAPI<T>(path: string, init?: RequestInit): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not logged in");

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? `HTTP ${res.status}`);
  }
  return res.json();
}
```

### Using it — GET (list)

```tsx
import { ConexAPI } from "../api/ConexApiClient";
import type { Task } from "../api/ConexTypes";

const tasks: Task[] = await ConexAPI<Task[]>("/tasklist");
```

### Using it — GET (single item)

```tsx
const customer: Customer = await ConexAPI<Customer>(`/customer/${id}`);
```

### Using it — POST

```tsx
const newTask: Task = await ConexAPI<Task>("/task/auto", {
  method: "POST",
  body: JSON.stringify({
    service_id: "s1...",
    description: "Kitchen outlet has no power",
  }),
});
```

> **Always** `JSON.stringify(...)` the body. The `fetch` API sends `[object Object]` otherwise.

### Using it — with try/catch

```tsx
let tasks: Task[] = [];

try {
  tasks = await ConexAPI<Task[]>("/tasklist");
} catch (e) {
  console.error("Failed to load tasks:", e instanceof Error ? e.message : e);
}
```

### Error behavior

`ConexAPI` throws `Error` on **every** non-2xx. The `.message` is whatever the backend sent in `detail`. Common cases:

| Status | Backend `detail` | Cause |
|---|---|---|
| `401` | `Missing or malformed Authorization header` | Header not sent |
| `401` | `Token expired` | JWT `exp` in the past |
| `401` | `Invalid token` | Wrong algorithm / signature / audience |
| `403` | `Not allowed by row-level security` | RLS blocked the operation |
| `403` | `Cannot create a task for another customer` | Tried to create a task for another `customer_id` |
| `404` | `Customer not found` / `Task not found` | Row doesn't exist **or** RLS hides it |
| `409` | `Resource already exists` | Unique constraint violated |
| `400` | `Referenced resource does not exist` | FK violation |

---

## 5. ConexApiClient.ts — same pattern for every type

`ConexAPI<T>(path)` works **identically** for every structure in `ConexTypes.ts`. The only thing that changes between calls is **two things**:

1. **The type** inside `< >` — `Task`, `Customer`, `Employer`, or `Service`.
2. **The path** — the endpoint that returns that structure.

Everything else (token, headers, error handling, `useState`, `useEffect`) is identical.

### The swap table — pick a structure, change 2 things

| `ConexTypes.ts` type | GET path (list) | GET path (single) |
|---|---|---|
| `Task` | `/tasklist` | `/tasklist/{id}` |
| `Customer` | `/customers` | `/customer/{id}` |
| `Employer` | `/employers` | `/employer/{id}` |
| `Service` | `/services` | *(no single-item route)* |

### Side-by-side — same code, different types

```ts
import { ConexAPI } from "../api/ConexApiClient";
import type { Task, Customer, Employer, Service } from "../api/ConexTypes";

// Task     → /tasklist
const tasks:       Task[]     = await ConexAPI<Task[]>("/tasklist");

// Customer → /customers
const customers:   Customer[] = await ConexAPI<Customer[]>("/customers");

// Employer → /employers
const employers:   Employer[] = await ConexAPI<Employer[]>("/employers");

// Service  → /services
const services:    Service[]  = await ConexAPI<Service[]>("/services");
```

Literally the **same function**, four different types, four different paths. To add a new structure later (say `Invoice`), you just:

1. Add `export type Invoice = { ... }` to `ConexTypes.ts`
2. Add a route `GET /invoices` to `main.py` + `Querys.GET_invoices`
3. Call `await ConexAPI<Invoice[]>("/invoices")`

No change to `ConexApiClient.ts`.

### Side-by-side — single item (by ID)

```ts
// Task     → /tasklist/{id}
const task:       Task     = await ConexAPI<Task>(`/tasklist/${id}`);

// Customer → /customer/{id}
const customer:   Customer = await ConexAPI<Customer>(`/customer/${id}`);

// Employer → /employer/{id}
const employer:   Employer = await ConexAPI<Employer>(`/employer/${id}`);
```

### Side-by-side — POST (only `Task` exists today)

```ts
// Only Task has a create route right now.
// The pattern is the same if you add more later.
const newTask: Task = await ConexAPI<Task>("/task/auto", {
  method: "POST",
  body: JSON.stringify({ service_id, description }),
});
```


### What `ConexTypes.ts` gives you

```ts
// src/api/ConexTypes.ts — flat, independent types
export type Customer = { customer_id: string; name: string; surname: string; email: string; pswd_hash: string; };
export type Employer = { employer_id: string; name: string; email: string; };
export type Service  = { service_id: string;  name: string; };
export type TaskStatus = "open" | "in_progress" | "done" | "cancelled";
export type Task = {
  task_id: string;
  customer_id: string;
  service_id: string;
  employer_id: string;
  problem_description: string;
  status: TaskStatus;
  created_at: string;
};
```

Any of these can go into `ConexAPI<Here>`. The function doesn't care — it just returns `res.json()` cast to whatever you declared. **The type is the contract; the path is the endpoint.** Pick a pair, call, done.

### Visual summary

```
ConexAPI<Here>(there)
         ↑      ↑
         │      └── path ("/tasklist", "/employers", "/customers", "/services")
         └── type from ConexTypes.ts (Task, Employer, Customer, Service)

Everything else stays the same.
```
---

## 6. Rules of thumb

| Do | Don't |
|---|---|
| Use `ConexAPI<T>(path)` for every backend call | Call `fetch` directly — you'll forget the token |
| `JSON.stringify(body)` on POST | Pass an object — `fetch` sends `[object Object]` |
| `useEffect(..., [])` for one-shot loads | `useEffect` with `tasks` in deps — infinite loop |
| Handle `401` by redirecting to `/create-account` | Show "Failed to load" for an expired session |
| Type responses with `ConexTypes.ts` | Use `any` — lose autocomplete and typo detection |
| Never send `role` from the client | The DB trigger sets it — sending it would be a security bug |