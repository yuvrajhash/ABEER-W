# AIPL Group E-Commerce Website

A modern, full-featured e-commerce website for AIPL Group, a pharmaceutical company that provides premium healthcare products for both humans and animals. The website is built with Next.js, Tailwind CSS, and other cutting-edge technologies.

## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Advanced Animations**: Smooth animations and transitions using Framer Motion
- **Product Catalog**: Comprehensive product listings with filtering and search capabilities

- **User Authentication**: Secure user authentication system
- **Interactive UI**: Modern and intuitive user interface with advanced components

## Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Database**: MongoDB with Mongoose (ready for implementation)
- **Authentication**: NextAuth.js (ready for implementation)

## Deployment Instructions

The website can be deployed as a static site using multiple hosting platforms:

### Netlify Deployment

1. Fork or clone this repository
2. Connect your GitHub repository to Netlify
3. Use the following build settings:
   - Build command: `npm run static-build`
   - Publish directory: `out`
4. Click "Deploy site"

### Vercel Deployment

1. Fork or clone this repository
2. Import the project on Vercel
3. It will automatically detect Next.js and deploy correctly
4. For static deployment, set the output to "export" in the project settings

### Manual Deployment

1. Build the static site:
   ```bash
   npm run static-build
   ```
2. The static site will be generated in the `out` directory
3. Upload the `out` directory to any static hosting service (AWS S3, GitHub Pages, etc.)

## Pages

- **Home**: Landing page with hero section, featured products, and testimonials
- **Products**: Product catalog with filtering and search functionality
- **About**: Company information, mission, and team
- **Contact**: Contact form and information
- **Policies**: Privacy policy, terms of service, shipping policy, and payment policy

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AIPL-ecommerce.git
   cd AIPL-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
AIPL-ecommerce/
├── app/                  # Next.js App Router
│   ├── about/            # About page
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication API

│   ├── components/       # Reusable components
│   ├── contact/          # Contact page
│   ├── policies/         # Policies page
│   ├── products/         # Products page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
│   └── images/           # Image assets
├── .gitignore            # Git ignore file
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.mjs    # PostCSS configuration
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration
```

## Future Enhancements

- **User Authentication**: Implement full user authentication with NextAuth.js
- **Shopping Cart**: Add shopping cart functionality with local storage and/or database persistence
- **Payment Integration**: Integrate payment gateways like Stripe
- **Order Management**: Add order tracking and history
- **Admin Dashboard**: Create an admin dashboard for product and order management


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Images sourced from Unsplash
- Icons from Lucide React
- UI inspiration from modern e-commerce websites

# Pharma E-commerce

This is a Next.js e-commerce platform for pharmaceutical products.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying to Vercel

### Option 1: Deploy via Vercel Web Interface (Recommended)

1. Create a [Vercel account](https://vercel.com/signup) if you don't have one already
2. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
3. Visit [vercel.com/new](https://vercel.com/new) to import your project
4. Select your Git repository and follow the setup instructions
5. Configure the required environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_URL`: Your production URL (will be provided by Vercel)
   - `NEXTAUTH_SECRET`: A secure secret for NextAuth
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (if using Google auth)
6. Click "Deploy" and wait for your project to build

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Run the deployment command:
```bash
vercel
```

4. Follow the interactive prompts to configure your project
5. For production deployment:
```bash
vercel --prod
```

### Troubleshooting Deployment Issues

If you encounter build errors:

1. Check that all required environment variables are set
2. Ensure your MongoDB connection is accessible from Vercel's servers
3. Review the build logs for specific errors
4. Make sure your Next.js configuration is compatible with Vercel deployment

## Environment Variables

The following environment variables are required:

```
# Database
MONGODB_URI=your-mongodb-connection-string

# NextAuth
NEXTAUTH_URL=your-production-url
NEXTAUTH_SECRET=your-strong-secret-key

# Google Auth (if used)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Technologies Used
- Next.js
- React 
- MongoDB
- NextAuth
- TailwindCSS
