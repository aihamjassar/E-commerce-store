# E-Commerce Store

> A MERN-style e-commerce platform with user authentication, product and category browsing, shopping cart state, coupons, Stripe payments, Cloudinary media, Redis support, administrative product management, and analytics.

## Overview

This repository contains the source and supporting files for **E-Commerce Store**. The documentation below was prepared from the current repository structure and implementation files so that setup expectations, project boundaries, and implemented capabilities are explicit.

## Technology

| Area | Implementation |
| --- | --- |
| Frontend | React and Vite client in frontend/ |
| Backend | Express 5 API in backend/ |
| Data | MongoDB with Mongoose |
| Payments | Stripe |
| Media and cache | Cloudinary and Redis integrations |

## Key capabilities

| Area | Current implementation |
| --- | --- |
| Customer commerce | Supports account, catalog, category, cart, coupon, and purchase-success or cancellation flows. |
| Administration | Provides product creation, product listing, and analytics components. |
| Integrated services | Includes dedicated backend helpers for Cloudinary, Redis, and Stripe. |

## Getting started

Use the following workflow to work with the project locally.

```bash
git clone https://github.com/aihamjassar/E-commerce-store.git
cd E-commerce-store
npm install
npm install --prefix frontend
# Configure backend environment values
npm run dev
# In another terminal: npm run dev --prefix frontend
```

## Project structure

| Path | Purpose |
| --- | --- |
| backend/controllers/ | Auth, cart, coupon, payment, product, and analytics logic |
| backend/models/ | User, product, order, and coupon data models |
| backend/routes/ | API route definitions |
| frontend/src/pages/ | Storefront, cart, auth, and admin pages |
| frontend/src/stores/ | Client-side cart, product, and user state |

## Configuration notes

Configure MongoDB, Stripe, Cloudinary, Redis, and JWT-related settings through environment variables. Never commit service tokens; verify webhook and payment settings in a non-production environment first.

## License

No license file is currently included. Confirm the intended licensing terms with the repository owner before reuse or distribution.

## Maintainer

Maintained by [Aiham Jassar](https://github.com/aihamjassar). Contributions, issue reports, and improvement suggestions are welcome through the repository.
