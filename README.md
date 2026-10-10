# 📦 Parcelix — Courier & Logistics Management Platform

**Parcelix** is a modern courier and logistics management platform designed to simplify parcel delivery operations, from shipment creation and pickup scheduling to courier assignment, real-time status tracking, and successful delivery.

Built with Next.js, TypeScript, and Tailwind CSS, Parcelix provides a role-based interface for customers, couriers, and administrators to manage delivery operations through a centralized platform.

<p align="center">
  <a href="https://github.com/technayan/parcelix">
    <img src="https://img.shields.io/badge/Frontend-Repository-orange?style=for-the-badge&logo=github" alt="Frontend Repository" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-Framework-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## ✨ Key Features

### 👤 Customer
- Secure authentication and account management.
- Create shipments with sender and recipient information.
- Select delivery zones, hubs, and available shipment options.
- View shipment details and delivery progress.
- Track shipment status through the delivery workflow.
- Access payment results and shipment-related information.
- Update profile information and manage account details.

### 🚚 Courier
- Access courier-specific functionality.
- View assigned delivery tasks.
- Manage delivery progress through supported shipment status updates.
- Access relevant shipment and delivery information.

### 🛡️ Administrator
- Manage shipment operations.
- Review courier applications and verification status.
- Approve or reject courier applications with a reason when applicable.
- Manage hubs, delivery zones, and pricing configurations.
- Monitor shipment and courier-related information.

*Feature availability depends on the current backend implementation and assigned user permissions.*

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Component-based user interfaces |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Utility-first styling and responsive layouts |
| shadcn/ui | Reusable interface components |
| TanStack Query | Server-state management and data fetching |
| TanStack Form | Form state management |
| Zod | Schema validation |
| ofetch | Centralized HTTP requests |
| Biome | Code formatting and linting |

## 🏗️ Architecture

Parcelix follows a modular frontend architecture that separates API communication, data-fetching logic, reusable UI components, and page-level features.

```text
User Interface
      │
      ▼
Pages & Feature Components
      │
      ▼
React Query Hooks
      │
      ▼
API Functions
      │
      ▼
Centralized API Client
      │
      ▼
Parcelix Backend API
      │
      ▼
Database & Backend Services
```

### Architectural principles

- **Separation of concerns:** API functions, hooks, and UI components have distinct responsibilities.
- **Reusable components:** Shared UI elements reduce duplication and improve consistency.
- **Centralized API communication:** Common request configuration and authentication-refresh handling are managed through a shared API client.
- **Type safety:** TypeScript and Zod help maintain reliable data structures and validation.
- **Static deployment:** The frontend uses Next.js static export, allowing the generated application to be deployed to a static hosting provider.

### Project Structure

```text
parcelix/
├── public/                  # Static assets and public files
├── src/
│   ├── app/                 # App Router pages and layouts
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React Query hooks
│   ├── lib/                 # API client and shared utilities
│   ├── api/                 # API functions, if organized here
│   ├── schemas/              # Validation schemas, if organized here
│   └── types/                # Shared TypeScript types
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

> Adjust the directory names above to match the exact structure of your current repository.

## 🚀 Getting Started

Follow these instructions to run the frontend locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) — a version compatible with the project dependencies.
- npm, or another compatible package manager.
- Access to a running Parcelix backend API.

### 1. Clone the repository

```bash
git clone https://github.com/technayan/parcelix.git
```

### 2. Navigate to the project directory

```bash
cd parcelix
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://parcelix-backend.vercel.app/api/v1
```

For local backend development, replace the value with your local API base URL.

**Important:** The API URL must match the base URL expected by the centralized API client. Never place private API secrets in `NEXT_PUBLIC_` environment variables because they are exposed to browser-side code.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
```

Parcelix uses Next.js static export. The production build should generate an `out/` directory containing the exported application.

Deploy the generated static files to a compatible static hosting provider.

> Static export does not provide a Next.js server runtime. Features that require server-side execution must be handled by the backend or implemented using compatible client-side and static-page patterns.

## 🔐 Authentication & Authorization

Parcelix uses role-based interfaces to organize access to customer, courier, and administrative functionality.

The frontend integrates with the backend authentication API through a centralized API client.

Authentication-related responsibilities include:

- Managing authenticated application state.
- Handling access to protected pages through authentication guards.
- Restricting role-specific interfaces through role guards.
- Handling expired access tokens through the refresh-token flow.
- Redirecting users according to authentication and authorization state.

**Security note:** Frontend guards improve the user experience but do not replace backend authorization. The backend must independently validate credentials, permissions, and access to protected resources.

## 🔄 Shipment Workflow

The platform is designed around the following parcel delivery lifecycle:

```text
Create Shipment
      │
      ▼
Pickup Request
      │
      ▼
Courier Assignment
      │
      ▼
Parcel Picked Up
      │
      ▼
Origin Hub
      │
      ▼
Transit / Hub Transfer
      │
      ▼
Destination Hub
      │
      ▼
Out for Delivery
      │
      ▼
Delivered
```

Additional operational scenarios can include failed delivery, shipment cancellation, and return-to-sender, depending on the supported backend workflow.

## 🌐 Backend Integration

Parcelix communicates with a separate backend API for application data and business operations.

**Backend API base URL:** `https://parcelix-backend.vercel.app/api/v1`

The frontend relies on backend endpoints for supported operations such as authentication, shipment management, courier management, hub and zone data, pricing, and payment-related workflows.

API requests are organized separately from UI components to improve maintainability and consistency.

## 📱 Responsive Design

The interface is designed to support desktop, tablet, and mobile screen sizes.

Responsive layouts, reusable components, and utility-based styling help maintain a consistent experience across different devices.

## 🧑‍💻 Development Workflow

### Code quality

Parcelix uses Biome to support consistent code formatting and linting.

Run the scripts configured in `package.json` to check and format the codebase.

```bash
npm run lint
npm run format
```

> These commands assume the corresponding scripts are defined in `package.json`. Use the actual script names configured in the repository if they differ.

### Recommended development practices

- Keep API calls separate from presentation components.
- Reuse shared form controls and validation schemas.
- Handle loading, empty, success, and error states.
- Keep TypeScript types aligned with backend responses.
- Use descriptive Git commits.
- Test critical authentication, shipment, and payment flows before deployment.

## 🗺️ Future Improvements

Potential enhancements for the platform include:

- Automated tests for critical user journeys.
- More comprehensive shipment analytics and reporting.
- Enhanced tracking visualization and delivery notifications.
- Improved accessibility and user experience.
- Expanded end-to-end testing and continuous integration.
- Additional monitoring and production reliability improvements.

These are potential improvements rather than a claim that they are already implemented.

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the affected functionality.
5. Commit your changes with a descriptive message.
6. Open a pull request.

## 📄 License

This project is available under the MIT License only if an MIT license has been added to the repository. Otherwise, specify the license you have chosen or omit this section until licensing is established.

## 👨‍💻 Author

**Abdullah Al Mamun Nayan**

Full-stack web developer focused on building practical web applications with modern JavaScript technologies.

- GitHub: [@technayan](https://github.com/technayan)
- Project Repository: [Parcelix](https://github.com/technayan/parcelix)

---

<p align="center">
  <strong>Parcelix — Simplifying Parcel Delivery, One Shipment at a Time.</strong>
</p>
