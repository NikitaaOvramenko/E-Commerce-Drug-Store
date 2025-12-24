# E-Commerce Drug Store

A robust, full-stack e-commerce platform designed for the pharmaceutical industry. This system enables users to browse, search, and purchase medical products securely, managing the entire lifecycle from product selection to order fulfillment.

![Domain Model](online-store-diagram.drawio.png)

## Overview

The **E-Commerce Drug Store** is a production-grade application solving the challenge of digital pharmaceutical sales. Unlike generic e-commerce platforms, this system is designed with specific attention to data integrity, inventory management, and secure transaction processing required for medical products.

### Core Responsibilities

- **Product Catalog Management**: Structured inventory with Categories, Brands, Types, and detailed Drug information.
- **Secure Authentication**: JWT-based stateless authentication and authorization.
- **Shopping Basket**: Persistent user sessions for managing potential purchases.
- **Order Processing**: Transactional order creation and lifecycle management.
- **Payment Handling**: Extensible payment processing architecture.
- **User Feedback**: Rating system for products.

## Domain Model & Data Design

The database schema is designed for **3rd Normal Form (3NF)** to ensure data integrity and reduce redundancy. The core workflow follows the **User → Basket → Order → Payment** lifecycle.

### Key Entity Relationships

1.  **User & Identity**:

    - Users are the central entity, linked to Baskets, Orders, and Ratings.
    - Security is handled via `Role` enums stored with the User entity.

2.  **The Basket (Pre-Purchase State)**:

    - MODELED AS: `Basket` (1:1 with User) and `BasketDrug` (Join Table).
    - **Why a Join Table?**: `BasketDrug` explicitly models the _relationship_ between a Basket and a Drug, allowing us to store metadata like `quantity` specific to that instance of the item in the cart without modifying the core Drug entity.

3.  **The Order (Transactional State)**:

    - MODELED AS: `Order` (1:N with User) and `OrderDrug` (Join Table).
    - **Snapshotting**: When an Order is placed, items move from `BasketDrug` to `OrderDrug`. Crucially, `OrderDrug` captures the `price_at_purchase`. This ensures that future price changes in the catalog do not corrupt historical order records—a critical requirement for financial auditing.

4.  **Payment & Fulfillment**:
    - `Payment` is 1:1 with `Order`, enforcing a strict transactional boundary. An order exists independently of payment status, allowing for retries or asynchronous payment processing.
    - `OrderAddress` is snapshot at the time of order to preserve shipping context.

### Transactional Boundaries

- **Basket Operations**: Atomic updates to cart contents.
- **Order Placement**: A complex transaction that:
  1.  Validates stock levels.
  2.  Creates the Order record.
  3.  Transfers items from Basket to Order.
  4.  Decrements inventory.
  5.  Clears the Basket.
  6.  All within a single database transaction to prevent inventory drift.

## Architecture & Request Flow

The project follows a **Layered Architecture** to separate concerns and improve maintainability.

### Backend (Java / Spring Boot)

- **Controller Layer**: Handles HTTP requests, validation, and API versioning.
- **Service Layer**: Contains core business logic (e.g., "Check stock before adding to cart").
- **Repository Layer**: Abstraction over Data Access using Spring Data JPA.
- **Security**: Spring Security filter chain with JWT for stateless auth.

### Frontend (React / TypeScript)

- **Component-Based UI**: Built with React 19 and Tailwind CSS.
- **State Management**: React Hooks for local state; efficient API integration.
- **Routing**: Client-side routing via React Router DOM.

### Request Lifecycle

1.  **Client**: React app sends a `POST /api/orders` request with JWT.
2.  **Security**: `JwtFilter` validates the token and sets the SecurityContext.
3.  **Controller**: `OrderController` receives the DTO and validates input.
4.  **Service**: `OrderService` executes business rules (stock check, price calculation).
5.  **Data**: `OrderRepository` persists the entities to PostgreSQL.
6.  **Response**: JSON Confirmation returned to client.

## Tech Stack

### Backend

- **Language**: Java 17
- **Framework**: Spring Boot 3.5.7
- **Database**: PostgreSQL (Production), H2 (Test)
- **Security**: Spring Security 6, JJWT 0.11.5
- **Testing**: JUnit 5, Mockito

### Frontend

- **Language**: TypeScript 5.9
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4, Material UI 7
- **HTTP**: Axios

## Engineering Decisions & Trade-offs

- **Stateless Auth (JWT)**: Chosen over session-based auth to allow easier horizontal scaling of backend services. The trade-off is the complexity of token revocation strategies.
- **Join Tables for Line Items**: Used `BasketDrug` and `OrderDrug` entities instead of `ElementCollection` or JSON blobs. This allows for efficient SQL querying on "most popular items" and enforces foreign key constraints at the database level.
- **DTO Projection**: Strict separation between JPA Entities and API DTOs prevents accidental leakage of internal data (like password hashes or internal timestamps) and decouples the API contract from the DB schema.

## Setup & Development

### Prerequisites

- Java 17+
- Node.js 20+
- PostgreSQL (Optional, defaults to H2 for local dev)

### Backend Setup

1.  Navigate to `drug_store`:
    ```bash
    cd drug_store
    ```
2.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
3.  API will be available at `http://localhost:8080`.

### Frontend Setup

1.  Navigate to `frontend-ecommerce-drug-store`:
    ```bash
    cd frontend-ecommerce-drug-store
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start development server:
    ```bash
    npm run dev
    ```
4.  UI will be available at `http://localhost:5173`.

## Future Improvements

- **Payment Gateway Integration**: Integration with Stripe for real-time payment processing.
- **Admin Dashboard**: Comprehensive analytics and inventory management UI.
- **Search Optimization**: Implementation of Full-Text Search (e.g., Elasticsearch) for the product catalog.
