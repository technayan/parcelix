# Parcelix

Parcelix is a modern, full-featured logistics and parcel delivery management platform. It streamlines the entire delivery workflow — from creating shipments and real-time tracking to managing couriers, zones, hubs, pricing, and payments — all in one intuitive interface for customers, couriers, and administrators.

## 🚀 Features

- **Shipment Management**: Create, track, and manage shipments with real-time status updates
- **Multi-Role System**: Dedicated dashboards for Customers, Couriers, and Administrators
- **Real-Time Tracking**: Track your parcels with up-to-date delivery status
- **Courier Management**: Apply as a courier, manage assignments, and track delivery statistics
- **Admin Dashboard**: Comprehensive admin controls for user management, courier approvals, shipment oversight, and analytics
- **Zone & Hub Management**: Define delivery zones and manage logistics hubs
- **Flexible Pricing**: Dynamic pricing based on delivery zones and parcel specifications
- **Secure Authentication**: Email/password auth with Google OAuth integration
- **Payment Processing**: Secure payment handling for shipments
- **Responsive Design**: Optimized for desktop and mobile devices
- **Type-Safe**: Built with TypeScript for reliability and maintainability

## 🛠️ Tech Stack

- **[Next.js 16.3](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 19](https://react.dev/)** - UI library
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[TanStack Form](https://tanstack.com/form)** - Type-safe form management
- **[Zod](https://zod.dev/)** - Schema validation
- **[Base UI](https://base-ui.com/)** - Unstyled UI components
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable UI components
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Google OAuth](https://github.com/MomenSherif/react-oauth)** - Authentication integration
- **[ofetch](https://github.com/unjs/ofetch)** - HTTP client
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)

## ⚙️ Installation

1. Clone the repository

```bash
git clone <repository-url>
cd parcelix
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://parcelix-backend.vercel.app/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

> **Note:** The API base URL is pre-configured to point to the deployed backend. Replace the Google Client ID with your own if you need to test OAuth locally.

4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```text
parcelix/
├── public/                # Static assets (images, logos, icons)
├── src/
│   ├── api/              # API client functions and endpoints
│   ├── app/              # Next.js App Router pages
│   │   ├── (customer)/   # Customer-specific routes
│   │   ├── (dashboard)/  # Shared dashboard layouts (Admin/Courier/Customer)
│   │   ├── (pablic)/     # Public routes (marketing, auth)
│   │   ├── error.tsx     # Global error boundary
│   │   └── layout.tsx    # Root layout
│   ├── components/       # Reusable UI components
│   │   ├── form/         # Form components
│   │   ├── layout/       # Layout components (header, footer)
│   │   ├── modules/      # Feature-specific modules
│   │   └── ui/           # Base UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries and configurations
│   ├── routes/           # Route definitions for navigation
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper utility functions
│   └── validation/       # Zod validation schemas
├── .env                  # Environment variables
├── biome.json            # Biome configuration
├── components.json       # shadcn/ui configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
└── tsconfig.json         # TypeScript configuration
```

## 🎯 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run Biome linter and checks |
| `npm run format` | Format code using Biome |

## 💡 Usage

- **As a Customer**: Register/login, create shipments, track parcels, make payments, and view your transaction history
- **As a Courier**: Apply to become a courier, view assigned shipments, update delivery status, and track your statistics
- **As an Admin**: Manage users and couriers, oversee shipments, approve courier applications, and view platform analytics

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to Parcelix, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run linting and formatting (`npm run lint && npm run format`)
5. Commit your changes (`git commit -m 'Add your feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🔗 Deployment

The easiest way to deploy this Next.js app is on [Vercel](https://vercel.com/). For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

Built with ❤️ using Next.js 16 and modern web technologies.