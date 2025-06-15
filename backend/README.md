# Budget tracker Backend

The backend server for Budget tracker, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- 🔐 JWT Authentication
- 🗄️ MongoDB with Mongoose ODM
- 🔍 Type-safe with TypeScript
- 🛡️ Secure password hashing
- 🚦 Request validation
- ⚡ Async/Await syntax
- 📝 CRUD operations for blog posts

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd near-pay/backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start MongoDB service (if not already running)

5. Start the development server:
```bash
# Development mode with hot-reload
npm run dev
# or
yarn dev

# Production mode
npm start
# or
yarn start
```

The server will be running at `http://localhost:8008`

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm start` - Start production server
- `npm run build` - Build TypeScript code
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── types/          # TypeScript types
├── utils/          # Utility functions
└── app.ts         # Express app setup
```



## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string  |
| JWT_SECRET | Secret key for JWT | Required |

## Database

The application uses MongoDB as its database. Make sure you have MongoDB installed and running locally, or provide a connection string to a remote MongoDB instance in your `.env` file.

### Models

1. User Model:
```typescript
{
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
```

2. Post Model:
```typescript
{
  title: string;
  content: string;
  author: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

## Error Handling

The API uses a centralized error handling mechanism with appropriate HTTP status codes and error messages.

## Security

- Passwords are hashed using bcrypt
- JWT for authentication
- Request validation using express-validator
- CORS enabled
- Helmet for security headers

## Development

### Code Style

The project uses ESLint and TypeScript for maintaining code quality. Configuration can be found in:
- `tsconfig.json` - TypeScript configuration
- `.eslintrc` - ESLint rules

### Best Practices

- Use async/await for asynchronous operations
- Validate all incoming requests
- Use TypeScript types/interfaces
- Follow RESTful conventions
- Implement proper error handling

## Production Deployment

1. Build the TypeScript code:
```bash
npm run build
# or
yarn build
```

2. Set production environment variables

3. Start the server:
```bash
npm start
# or
yarn start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

