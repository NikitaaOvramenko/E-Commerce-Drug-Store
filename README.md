<!-- markdownlint-disable MD033 -->
# Pharmacy Store — Telegram Mini App

> A full-stack pharmacy e-commerce app built as a **Telegram Mini App**, featuring a real payment flow with Telegram invoices, live order-status sync, an admin panel, and support for three languages.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/background.mp4" autoplay loop muted playsinline></video>

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-6DB33F?style=flat&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat&logo=openjdk&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?style=flat&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

## What is this?

A pharmacy e-commerce store that lives inside Telegram as a Mini App. Users log in, browse a product catalog, add items to their basket, and place orders — at which point a real Telegram invoice is sent to the chat and payment is processed through Telegram's payment system. Order status updates sync in real-time between the Telegram chat and the app. A separate admin panel lets store managers add, edit, and remove products, brands, and categories, with changes reflected immediately in the store.

---

## Showcase

### Opening the App

First launch and login flow.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/open-app-and-login.mp4" autoplay loop muted playsinline></video>

---

### Authentication

Login to the client store and the admin panel simultaneously.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/showcasing-login-to-admin-panel-in-left-window-and-login-to-client's-store-account.mp4" autoplay loop muted playsinline></video>

---

### Navigation & UI

Menus, page transitions, and the overall layout.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/opening-all-menus-and-navigating-to-other-pages.mp4" autoplay loop muted playsinline></video>

---

### Search & Filter

Real-time search combined with filters for type, brand, and category.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/search-bar-and-filter-tab-showcase.mp4" autoplay loop muted playsinline></video>

---

### Favorites

Save products to a personal favorites list.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/favorites-page-showcase.mp4" autoplay loop muted playsinline></video>

---

### Basket to Checkout to Telegram Invoice

Add items to the basket, go through checkout, enter address and payment info, and receive an invoice directly in the Telegram chat.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/add-items-to-basket-then-checkout-then-place-order-then-invoice-sent-to-tg-and-showcase-of-credit-entry-and-address.mp4" autoplay loop muted playsinline></video>

---

### Orders & Live Payment Status Sync

Order status shown in the app stays in sync with the Telegram chat — paying in the chat updates the app instantly.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/showcase-of-order-page-by-example-of-showing-sync-between-pending-payment-status-in-chat-and-in-the-app-and-also-showing-checkout-in-orders-page-and-showcase-of-placing-order-from-the-order-page.mp4" autoplay loop muted playsinline></video>

---

### Multi-Language Support

Switch between English, Russian, and Ukrainian — the entire app updates instantly.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/showcasing-changing-language-affecting-whole-app.mp4" autoplay loop muted playsinline></video>

---

### Telegram Theme Sync

The app reads Telegram's active color palette and adapts its theme automatically — light or dark.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/showcasing-theme-change-based-on-telegram-theme-colors.mp4" autoplay loop muted playsinline></video>

---

### Admin Panel — Drug Management

Add a new drug from the admin panel and watch it appear in the store in real time.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/showcasing-admin-panel-on-left-and-mini-app-on-the-right-and-demonstrating-flow-of-adding-new-drug-to-db-and-showing-update-in-the-mini-app+(0).mp4" autoplay loop muted playsinline></video>

---

### Admin Panel — Types, Brands & Categories

Edit or remove drug types, brands, and categories — updates reflect in the store immediately.

<video src="https://nikita-projects-media.s3.us-east-2.amazonaws.com/tg-ecommerce/showcasing-the-rest-of-admin-panel-capabilities-like-editing-types-brands-and-removing-drug-from-db-and-showed-changes-on-the-mini-app.mp4" autoplay loop muted playsinline></video>

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Backend | Spring Boot 3.5.7 · Java 17 · PostgreSQL · Spring Security · JWT · JPA/Hibernate |
| Frontend | React 19 · TypeScript · Vite · Tailwind CSS · Axios |
| Bot & Payments | Telegram Bot API · FastAPI (Python) |

---

## Setup & Running

### Prerequisites

- Java 17+
- PostgreSQL running on `localhost:5432` with a database named `SpringDrugStore`
- Node.js 18+
- Python 3.10+ (for the Telegram bot)

### Environment variables

Backend (`drug_store/src/main/resources/application.properties` or env):

```
JWT_SECRET=<your_jwt_secret>
EMAIL_USER=<your_gmail>
EMAIL_PASSWORD=<your_gmail_app_password>
```

### Run

**Backend:**

```bash
cd drug_store
mvn spring-boot:run
# Runs on http://localhost:8080
```

**Frontend:**

```bash
cd frontend-ecommerce-drug-store
npm install
npm run dev
# Runs on http://localhost:5173
```

**Telegram bot:**

```bash
cd telegram-bot
pip install -r requirements.txt
uvicorn main:app --port 8000
```
