# Budget tracker 

A full-stack blog application built with React, TypeScript, and Material-UI, featuring user authentication, budget management

## Features

- 🔐 User Authentication (Login/Register)
- 📝 Create, Read, Update, Delete Blog Posts
- 🎨 Modern UI with Material-UI and Tailwind CSS
- 🔄 State Management with Redux + Redux Saga
- 📱 Responsive Design
- ⚡ Fast Development with Vite
- 🔍 Type Safety with TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (for backend)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd budget-tracker/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8008/
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:4000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build



## Technologies Used

- React 19
- TypeScript
- Material-UI
- Redux Toolkit
- Redux Saga
- Formik + Yup
- Tailwind CSS
- Vite
- Axios

## Authentication

The application uses JWT-based authentication. Tokens are stored in localStorage and automatically included in API requests.

## Development

### Code Style

- ESLint and TypeScript for code quality
- Prettier for code formatting
- Tailwind CSS for styling

### State Management

- Redux Toolkit for state management
- Redux Saga for side effects
- Redux Persist for state persistence

## Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

The build will be available in the `dist` directory.

