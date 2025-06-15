# 🛠️ Project Notes

## 📦 Frontend

| Command        | Description                 |
| -------------- | --------------------------- |
| `npm run dev`  | Start development server    |
| `npm run lint` | Run ESLint for code linting |
| `npm test`     | Run test suite with Jest    |

---

## 🧩 Backend

#### What is Middleware ?

- A middleware is a function that runs between receiving a request and sending a response in a web application.
- It acts as a layer that can process or modify the request or response.

- `Client Request --> Middleware 1 --> Middleware 2 --> Route Handler --> Response
`

---

## 🪝 Git Hooks: Husky Setup

- [x] Setup Husky pre-commit hook
- [x] Run lint and tests before committing
- [x] Prevent pushing broken or untested code

---

## 📝 Conventional Commit Types (used by senior devs)

| Type       | Purpose                          | Example                                      |
| ---------- | -------------------------------- | -------------------------------------------- |
| `feat`     | New feature                      | `feat(ui): add dark mode toggle`             |
| `fix`      | Bug fix                          | `fix(api): resolve 500 error on login`       |
| `chore`    | Tooling/config updates           | `chore: update Husky and ESLint config`      |
| `refactor` | Code change (no behavior change) | `refactor: extract reusable modal component` |
| `docs`     | Documentation changes            | `docs(readme): update install instructions`  |
| `test`     | Add or fix tests                 | `test(dashboard): add unit test for load`    |
| `style`    | Code formatting (no code change) | `style: format files with prettier`          |
| `perf`     | Performance improvements         | `perf: optimize image lazy-loading`          |

---
