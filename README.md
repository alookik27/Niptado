# Niptado

Niptado is a modern task management application that helps users organize, prioritize, and track their work efficiently. With an intuitive Kanban board, drag-and-drop functionality, secure authentication, and responsive design, Niptado makes task management simple and productive across all devices.

## Live Demo

https://niptado.vercel.app

## Features

* Secure JWT Authentication
* Kanban Board Workflow
* Drag-and-Drop Task Management
* Real-Time Search and Filtering
* Optimistic UI Updates
* Responsive Design
* Dark and Light Mode
* MongoDB-Powered Storage

### Detailed Features

* **JWT Cookie-Based Authentication**: Secure registration and login using `bcryptjs` with JWT stored in HTTP-only cookies.
* **Edge-Compatible Middleware**: Route protection using Next.js middleware.
* **Responsive Kanban Board**: Organize tasks across Todo, In Progress, and Done columns.
* **Drag-and-Drop Support**: Built with `@dnd-kit/core` for smooth task movement.
* **Optimistic UI Updates**: Instant feedback while syncing changes to the database.
* **Real-Time Search & Filters**: Search tasks by title and description.
* **Dark Mode Support**: Seamless dark and light theme switching.

## Tech Stack

* **Frontend:** Next.js, Tailwind CSS, Lucide React
* **Backend:** Next.js API Routes
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT, bcryptjs

## Assumptions

* Users can only access and manage their own tasks.
* Authentication is required before accessing the dashboard.
* Tasks belong to one of three statuses: Todo, In Progress, or Done.
* MongoDB Atlas is used as the primary database.

## Technical Decisions

* Used **Next.js App Router** for modern routing and server-side capabilities.
* Used **MongoDB with Mongoose** for flexible data modeling.
* Implemented **JWT authentication with HTTP-only cookies** for improved security.
* Chose **@dnd-kit** for performant and accessible drag-and-drop interactions.
* Used **Tailwind CSS** for rapid and consistent UI development.

## Tradeoffs

* JWT authentication is stateless but requires token management.
* Optimistic updates improve user experience but require rollback handling on failures.
* MongoDB provides flexibility but lacks strict relational constraints.
* Drag-and-drop functionality increases implementation complexity.



## Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

* `MONGODB_URI` - MongoDB Atlas connection string.
* `JWT_SECRET` - Secret key used for signing and verifying JWT tokens.

```
```
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
