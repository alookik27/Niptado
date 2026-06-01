# Niptado

Niptado is a modern task management application that helps users organize, prioritize, and track their work efficiently. With an intuitive Kanban board, drag-and-drop functionality, secure authentication, and responsive design, Niptado makes task management simple and productive across all devices.

## Features

* Secure JWT Authentication
* Kanban Board Workflow
* Drag-and-Drop Task Management
* Real-Time Search and Filtering
* Optimistic UI Updates
* Responsive Design
* Dark and Light Mode
* MongoDB-Powered Storage

## Tech Stack:

* Frontend: Next.js, Tailwind CSS, Lucide React
* Backend: Node.js, Express.js
* Database: MongoDB
* Authentication: JWT, bcryptjs


## Features 

* **JWT Cookie-Based Authentication**: Secure registration and login using `bcryptjs` for password hashing, with JSON Web Tokens (JWT) stored in HTTP-Only cookies to protect against XSS.
* **Edge-Compatible Middleware**: Pre-route authentication and page protection using Web Crypto APIs inside Next.js Edge middleware.
* **Responsive Kanban Board**: Features three workspace columns (*Todo*, *In Progress*, *Done*). The board stacks cleanly on mobile viewports and adds a tab switcher for focused work.
* **Intuitive Drag-and-Drop**: Built using `@dnd-kit/core` with drag-handle constraints to keep action buttons clickable.
* **Optimistic UI Updates**: Task stages update instantly on the board, saving changes asynchronously to the MongoDB cluster.
* **Real-time Search & Filters**: Instant full-text searching by title and description, as well as mobile stage categorization.
* **Premium Dark Mode**: Seamless toggle support using Tailwind CSS v4 class-based variants with smooth transition animations.

## Setup

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Open http://localhost:3000 in your browser.




