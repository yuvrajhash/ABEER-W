# Adhiron Group E-Commerce Backend

This document provides information about the backend implementation for the Adhiron Group pharmaceutical e-commerce website.

## Backend Architecture

The backend is built using Next.js API routes with MongoDB for data persistence. It follows a RESTful API design pattern and includes the following components:

- **Database Connection**: MongoDB connection utility with connection pooling
- **Authentication**: NextAuth.js integration with credentials and Google provider
- **Data Models**: Mongoose schemas for Products, Users, and Orders
- **API Routes**: RESTful endpoints for CRUD operations

## API Endpoints

### Products

- `GET /api/products` - Get all products with optional filtering
  - Query parameters: category, type, featured, limit
- `GET /api/products/:id` - Get a specific product by ID
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth.js authentication endpoints
- `POST /api/users/register` - Register a new user

### Orders

- `GET /api/orders` - Get all orders for the current user
- `POST /api/orders` - Create a new order



## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Add bcrypt for password hashing:
   ```
   npm install bcrypt
   npm install @types/bcrypt --save-dev
   ```

3. Set up your MongoDB database (local or Atlas)

4. Create the `.env.local` file with the required environment variables

5. Run the development server:
   ```
   npm run dev
   ```

## Data Models

### Product

- name: String (required)
- description: String (required)
- price: Number (required)
- category: String (required)
- type: String (enum: 'human', 'veterinary') (required)
- image: String (required)
- stock: Number (required, default: 0)
- ingredients: [String]
- dosage: String
- sideEffects: [String]
- featured: Boolean (default: false)

### User

- name: String (required)
- email: String (required, unique)
- password: String
- image: String
- role: String (enum: 'user', 'admin', default: 'user')
- addresses: Array of address objects
- orders: Array of Order references

### Order

- user: Reference to User (required)
- products: Array of product objects with quantity and price
- totalAmount: Number (required)
- shippingAddress: Address object (required)
- status: String (enum: 'pending', 'processing', 'shipped', 'delivered', 'cancelled', default: 'pending')
- paymentMethod: String (required)
- paymentStatus: String (enum: 'pending', 'paid', 'failed', default: 'pending')
- trackingNumber: String

## Security Considerations

- Passwords are hashed using bcrypt
- Authentication is handled by NextAuth.js
- API routes are protected with session validation
- Input validation is performed on all endpoints