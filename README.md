# TaskManager Frontend

**TaskManager Frontend** is a **Next.js 15** application built with **MUI** and **Lovable UI Design** that consumes the TaskManager API to deliver a modern board-based experience. The project adopts a clear separation between the UI layer, domain hooks, and HTTP services, making both visual evolution and integration with new surfaces easier.

---

## Overview

TaskManager Frontend provides a responsive experience for authentication, board creation, and column and card management. Next.js App Router keeps file-based routing, while specialized hooks encapsulate business rules and synchronize data with the .NET API.

## Key Features

* Full authentication flow (login, refresh, forced logout) with tokens stored in memory.
* Board dashboard with search, creation, renaming, deletion, and member management.
* Board view with columns and cards, dialogs for adding/editing items, and real-time updates after each operation.

---

## Prerequisites

* **Node.js 18+** (Next.js 15 requires modern runtime features).
* **npm** (or **pnpm/yarn**) to install dependencies.
* **TaskManager API** running locally or remotely to provide protected endpoints.
* Optional: **Visual Studio Code** with ESLint and MUI IntelliSense extensions.

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/luvr0/TaskManager.Frontend.git
cd TaskManager.Front
npm install
```

### Using Visual Studio Code

1. Open the `TaskManager.Frontend` folder in VS Code.
2. Ensure the `.env.local` file contains `NEXT_PUBLIC_OPERATION_URL` pointing to the API.
3. Run `npm run dev` from the scripts panel or integrated terminal.
4. Use the Next.js debugger (`Chrome` or `Edge`) to inspect components.

### Using the CLI

```bash
npm run dev        # starts http://localhost:3000
npm run lint       # applies ESLint + @stylistic rules
npm run type-check # validates types with tsc --noEmit
```

---

## Running the App

* Development: `npm run dev` opens `http://localhost:3000` with Fast Refresh.
* Production build: `npm run build` generates an optimized `.next/` directory.
* Production preview: `npm run start` serves the build in Node mode.
* Static/container deployments must include the same `NEXT_PUBLIC_OPERATION_URL` variable used locally.

---

## UI Surface

| Route          | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| `/login`       | Form with error feedback and integration with `authService.login`.       |
| `/register`    | Registration flow with client-side validation and API call.              |
| `/boards`      | Board list with search, creation modal, and contextual actions.          |
| `/boards/[id]` | Detailed view with columns, cards, and dialogs for full CRUD operations. |

---

## Project Demonstration

https://github.com/user-attachments/assets/2fd27057-faa9-4708-a78d-f51f2ab8f680

---

## Tasks

* Add drag-and-drop animations using `@hello-pangea/dnd` in the board view.
* Properly implement `theme.ts`.
* Implement integration tests.
* Create a notifications component.
* Finalize responsiveness.
* Add Docker support.
