# Hills Market

A marketplace application for students to buy and sell items within their university community.

## Features

- **User Authentication**: Secure authentication using Supabase Auth
- **Product Listings**: Create, edit, and browse product listings
- **Messaging**: Chat with buyers/sellers
- **Admin Dashboard**: Manage users, products, and view statistics
- **University-based Filtering**: Filter products by university and category
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Express.js
- TypeScript
- Supabase (Authentication)
- PostgreSQL (Database)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- PostgreSQL database (provided by Supabase)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HillsMarketV2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**

   - Go to [Supabase](https://supabase.com) and create a new project
   - Wait for the database to be set up
   - Go to Project Settings > API to find your credentials

4. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your actual values:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   DATABASE_URL=your_postgres_connection_string
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. **Set up the database**

   Run the SQL schema in your Supabase SQL Editor:
   ```bash
   # Copy the contents of database/schema.sql and run it in Supabase SQL Editor
   ```

   Or connect to your database and run:
   ```bash
   psql <your_database_url> < database/schema.sql
   ```

6. **Create an admin user (optional)**

   After signing up, you can manually update a user's role to 'admin' in the database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your_email@example.com';
   ```

### Running the Application

#### Development Mode

**Run frontend and backend together:**
```bash
npm run dev:all
```

**Or run them separately:**

Frontend:
```bash
npm run dev
```

Backend:
```bash
npm run server
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

#### Production Mode

Build the frontend:
```bash
npm run build
```

Run the backend:
```bash
npm run server:prod
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (requires auth)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/my-products` - Get current user's products (requires auth)
- `POST /api/products` - Create new product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Messages
- `GET /api/messages/conversations` - Get user's conversations (requires auth)
- `GET /api/messages/conversations/:id/messages` - Get messages in conversation (requires auth)
- `POST /api/messages/conversations` - Create new conversation (requires auth)
- `POST /api/messages/messages` - Send message (requires auth)

### Admin (requires admin role)
- `GET /api/admin/statistics` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:userId/role` - Update user role
- `DELETE /api/admin/users/:userId` - Delete user
- `GET /api/admin/products` - Get all products
- `DELETE /api/admin/products/:productId` - Delete product

## Database Schema

The application uses the following main tables:
- `users` - User profiles and authentication
- `products` - Product listings
- `conversations` - Chat conversations between users
- `messages` - Individual messages in conversations

See `database/schema.sql` for the complete schema.

## Project Structure

```
HillsMarketV2/
├── components/         # React components
├── server/            # Express backend
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Express middleware
│   ├── routes/        # API routes
│   └── types/         # TypeScript types
├── database/          # Database schemas
├── .env               # Environment variables
└── package.json       # Dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@hillsmarket.com or open an issue in the repository.
