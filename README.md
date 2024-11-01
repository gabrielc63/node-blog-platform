# Modern Blogging Platform

A full-stack blogging platform built with React, Node.js, and modern web technologies.

## Features

- User authentication (JWT-based)
- Rich text editor for blog posts
- Image upload and management
- Tag and category management
- SEO-friendly URLs
- Responsive design
- Dark mode support

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for build tooling
- Zustand for state management
- React Query for server state
- TailwindCSS for styling
- React Router for routing
- React Hook Form for form handling

### Backend

- Node.js with Express
- MongoDB for database
- JWT for authentication
- Express Rate Limit for security
- Helmet for security headers
- Multer for file uploads

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd client
pnpm install

# Install backend dependencies
cd ../server
pnpm install
```

3. Set up environment variables:

```bash
# In server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# In client/.env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development servers:

```bash
# Start backend (from server directory)
pnpm dev

# Start frontend (from client directory)
pnpm dev
```

## Development

### Code Style

We use ESLint and Prettier for code formatting. Run linting:

```bash
pnpm lint
```

### Testing

```bash
pnpm test
```

### Building for Production

```bash
# Build frontend
cd client
pnpm build

# Build backend
cd ../server
pnpm build
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- XSS protection
- Security headers with Helmet
- Input validation
- SQL injection protection
- File upload restrictions

## License

MIT
