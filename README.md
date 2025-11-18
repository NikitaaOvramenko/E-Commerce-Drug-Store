# E-Commerce Drug Store Project

## Overview

This project is an **E-Commerce Drug Store** built using **Spring Boot**, **React**, and **PostgreSQL**. It supports user registration, login, basket management, and drug browsing.

This README will evolve as the project continues. For now, this serves as the starting structure.

---

## Features (Current & Planned)

* **User Authentication** (email + password)
* **Basket System** (add/remove drugs, update quantities)
* **Drug Catalog** (CRUD for admin, browsing for users)
* **DTO + Mapper Layer** for clean API responses
* **REST API Architecture**
* **Frontend (React)** integration (to be added)

---

## Technologies Used

### Backend

* Spring Boot
* Spring Security
* JPA / Hibernate
* PostgreSQL

### Frontend

* React (planned)
* Bootstrap / custom UI (planned)

---

## Project Structure

```
backend/
  src/main/java/.../controller
  src/main/java/.../service
  src/main/java/.../repository
  src/main/java/.../model
  src/main/java/.../dto
  src/main/java/.../mapper
frontend/
  (coming soon)
```

---

## Database Schema

(Add your **draw.io schema image** here once ready)

Example placeholder:

```
![Database Schema](./docs/schema.png)
```

---

## API Endpoints (To Be Documented)

### Auth

* POST `/register` – create account
* POST `/login` – authenticate user

### Basket

* GET `/basket` – get user basket
* POST `/basket/add` – add drug to basket
* DELETE `/basket/remove/{id}` – remove item

(Add more as implemented)

---

## How to Run (Backend)

1. Install Java 17+
2. Run PostgreSQL locally or via Docker
3. Configure `application.properties`
4. Run:

```
mvn spring-boot:run
```

---

## To-Do List

* [ ] Complete basket service implementation
* [ ] Finish DTO mapping for all models
* [ ] Add admin panel for drug CRUD
* [ ] Connect backend to React frontend
* [ ] Add global exception handling

---

## Notes

Feel free to add comments, ideas, todos, or improvements as the project grows.

