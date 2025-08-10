# Quiz builder frontend

## Table of Contents

- [Requirements](#requirements)
- [Tech Stack](#tech-stack)
- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [Other Commands](#other-commands)
- [Code Quality Tools](#code-quality-tools)

## Requirements

- Node.js
- Configured `.env` file
- Yarn (optional)

## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tanstack React Router](https://tanstack.com/router/latest)
- [Tanstack React Querry](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/ulyagram77/quiz-builder.git
```

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  yarn
```

Create environment file

```bash
  cp .env.example .env
```

Fill in the environment variables in `.env` file (see [Environment Variables](#environment-variables) section)

Start the development server

```bash
  yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Parameter          | Description                                               |
| :----------------- | :-------------------------------------------------------- |
| `VITE_BACKEND_API` | The URL of the backend API (e.g. <http://localhost:3000>) |

## Other Commands

Compile and run the project:

```bash
# run project in development mode
$ yarn dev

# build and run builded project in production mode
$ yarn preview

# build for production
$ yarn build
```

Team instruments:

```bash
# run the linter
$ yarn run lint

# run the formatter
$ yarn run format
```

## Code Quality Tools

This project uses the following tools to ensure code quality and consistency:

- **[ESLint](https://eslint.org/)** – Lints JavaScript/TypeScript code
- **[Prettier](https://prettier.io/)** – Formats code automatically
