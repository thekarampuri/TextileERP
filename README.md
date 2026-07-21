# Textile ERP

A modern Enterprise Resource Planning (ERP) dashboard tailored for textile manufacturing and management. Built with **Next.js (App Router)**, **React**, **Tailwind CSS**, and **Lucide React**.

## Features

- **Role-Based Access Control (RBAC)**: Customized views and permissions for `OWNER`, `MANAGER`, `HR`, `EMPLOYEE`, and `DESIGNER`.
- **Modular Dashboard Architecture**:
  - **Dashboard**: High-level overview of factory operations and statistics.
  - **Customers & Orders**: Manage client relationships, order intake, and lifecycle tracking.
  - **Designs**: Repository for textile patterns, motifs, and associated specifications.
  - **Production Board**: Interactive Kanban-style board tracking active jobs across Warping, Weaving, Finishing, and Packing stages.
  - **Machines**: Real-time tracking of machine statuses (Running, Idle, Maintenance) and weekly utilization tracking.
  - **Inventory & Dispatch**: Track raw materials, manage finished goods, and monitor shipping logistics.
  - **Employees & Reports**: HR management and comprehensive business analytics.

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS for a highly responsive, modern, and clean UI
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites
Make sure you have Node.js 18+ installed on your system.

### Installation

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. The primary dashboard layout is accessible under the `/dashboard` route.

## Project Structure

- `src/app/(dashboard)/*` - Contains the primary pages for the application (Production, Machines, Orders, etc.).
- `src/components/*` - Reusable UI components like `Modal.tsx`, `SidebarNav.tsx`, and standard UI elements.
