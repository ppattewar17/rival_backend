# Rival Blog Platform - Backend

A production-ready NestJS backend API for a secure blogging platform with authentication, blog management, and social features.

## 🚀 Features

- **JWT Authentication**: Secure user registration and login
- **Blog Management**: Full CRUD operations for blog posts
- **Social Features**: Like and comment system
- **Public API**: Public feed and blog access by slug
- **Database**: PostgreSQL with Prisma ORM 7
- **API Documentation**: Auto-generated Swagger/OpenAPI docs
- **Security**: Rate limiting, input validation, and authorization guards

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- npm or yarn

## 🛠️ Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/rival"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# App
PORT=3001
FRONTEND_URL=http://localhost:3000

# Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

3. **Set up the database**

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# (Optional) Open Prisma Studio to view data
npm run prisma:studio
```

## 🏃 Running the Application

### Development Mode
```bash
npm run start:dev
```
The API will be available at `http://localhost:3001`

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## 📚 API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:3001/api
```

## 🔐 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

- `POST /auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

### Blogs (Protected - Requires JWT Token)
- `GET /blogs` - Get user's blogs (paginated)
- `POST /blogs` - Create a new blog
  ```json
  {
    "title": "My Blog Title",
    "content": "Blog content here...",
    "summary": "Optional summary",
    "isPublished": true
  }
  ```
- `GET /blogs/:id` - Get specific blog by ID
- `PATCH /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog

### Public Endpoints (No Authentication Required)
- `GET /public/feed?page=1&limit=10` - Get paginated public feed
- `GET /public/blogs/:slug` - Get published blog by slug

### Comments (Protected)
- `POST /blogs/:blogId/comments` - Add comment to blog
  ```json
  {
    "content": "Great post!"
  }
  ```
- `GET /blogs/:blogId/comments` - Get blog comments
- `DELETE /blogs/:blogId/comments/:commentId` - Delete comment

### Likes (Protected)
- `POST /blogs/:blogId/likes` - Like a blog
- `DELETE /blogs/:blogId/likes` - Unlike a blog
- `GET /blogs/:blogId/likes` - Get blog likes

## 🗄️ Database Schema

### User
- `id` (String, CUID)
- `email` (String, unique)
- `passwordHash` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Blog
- `id` (String, CUID)
- `userId` (String, FK)
- `title` (String)
- `slug` (String, unique)
- `content` (String)
- `summary` (String, optional)
- `isPublished` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Comment
- `id` (String, CUID)
- `blogId` (String, FK)
- `userId` (String, FK)
- `content` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Like
- `id` (String, CUID)
- `userId` (String, FK)
- `blogId` (String, FK)
- `createdAt` (DateTime)
- Unique constraint on `(userId, blogId)`

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload

# Build
npm run build              # Build for production

# Production
npm run start:prod         # Run production build

# Database
npm run prisma:generate    # Generate Prisma Client
npm run prisma:push        # Push schema to database
npm run prisma:migrate     # Create migration
npm run prisma:studio      # Open Prisma Studio GUI

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests
```

## 🏗️ Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── auth/                  # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── strategies/        # Passport strategies
│   ├── blogs/                 # Blog management
│   │   ├── blogs.controller.ts
│   │   ├── blogs.service.ts
│   │   ├── blogs.module.ts
│   │   └── public.controller.ts
│   ├── comments/              # Comment system
│   ├── likes/                 # Like system
│   ├── users/                 # User management
│   ├── prisma/                # Prisma service
│   ├── guards/                # Auth guards
│   ├── decorators/            # Custom decorators
│   ├── dto/                   # Data transfer objects
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry
├── .env                       # Environment variables
├── prisma.config.ts           # Prisma 7 configuration
├── package.json
└── tsconfig.json
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: class-validator for DTO validation
- **Rate Limiting**: Built-in throttling protection
- **CORS**: Configured for frontend origin
- **Authorization**: Guards for protected routes
- **Ownership Checks**: Users can only modify their own content

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
Get-Service -Name "*postgres*"

# Test connection with Prisma Studio
npm run prisma:studio
```

### Prisma Client Issues
```bash
# Regenerate Prisma Client
npm run prisma:generate

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3002
```

## 📦 Dependencies

### Core
- `@nestjs/core` - NestJS framework
- `@nestjs/common` - Common utilities
- `@nestjs/platform-express` - Express adapter
- `@prisma/client` - Prisma ORM client
- `@prisma/adapter-pg` - PostgreSQL adapter for Prisma 7

### Authentication
- `@nestjs/jwt` - JWT utilities
- `@nestjs/passport` - Passport integration
- `passport-jwt` - JWT strategy
- `bcryptjs` - Password hashing

### Validation
- `class-validator` - DTO validation
- `class-transformer` - Object transformation

### Documentation
- `@nestjs/swagger` - OpenAPI/Swagger

### Security
- `@nestjs/throttler` - Rate limiting

## 🚀 Deployment

### Environment Variables for Production
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="use-a-strong-random-secret-here"
JWT_EXPIRES_IN="7d"
PORT=3001
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms
- **Railway**: Easy deployment with PostgreSQL
- **Render**: Free tier available
- **Fly.io**: Edge deployment
- **AWS/GCP/Azure**: Enterprise solutions

### Build for Production
```bash
npm run build
npm run start:prod
```

## 📝 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub.
