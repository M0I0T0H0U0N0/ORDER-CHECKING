# 🧾 Order Management System

This is a simple **Order Management** web application built using **React** for the frontend and **Django** with **Django REST Framework** for the backend. It allows the business owner to:

- View and manage customer orders
- Search orders by:
  - Customer Name
  - Shipping Address
  - Order Name
- Log in securely with email and password

---

## 🚀 Tech Stack

| Technology             | Role                     |
| ---------------------- | ------------------------ |
| React                  | Frontend UI              |
| Vite                   | React build tool         |
| Django                 | Backend server           |
| Django REST Framework  | RESTful API layer        |
| Firebase Hosting       | Hosting for frontend only |

---

## 🔐 Features

- **Login Page**: Secure login for the owner via email and password
- **Search Functionality**: Search orders by parameters (customer name, shipping address, or order name)
- **Order Listing**: Display orders matching search criteria
- **Authentication Check**: Orders can only be viewed if the credentials are valid

> ⚠️ **Note:** Firebase only hosts the frontend. Backend APIs (login validation, order listing) are **not available** in the hosted version because **Firebase does not support Django REST API hosting**.

---

## 🌐 Hosted Link

🖥️ View the login page here:  
👉 [https://projectunlodin.web.app/](https://projectunlodin.web.app/)

> 🛑 **Backend functionality will not work on this hosted page**, since Firebase does not support Python or Django-based APIs.




## Installation & Setup

Follow these steps to run the project locally:


## 1. Clone the Repository

```bash
git clone https://github.com/M0I0T0H0U0N0/ORDER-CHECKING.git
##  2. Install Dependencies

### Frontend

```bash
cd frontend/vite-project
pnpm install


### Backend
```bash
cd backend/project/drinks
pip install -r requirements.txt

## 3. Run the Application

### Run Frontend

```bash
cd frontend/vite-project
pnpm run dev

### Run Backend

```bash
cd backend/project/drinks
python manage.py runserver

##  4. API Endpoints

| Endpoint       | Method | Description               |
| -------------- | ------ | ------------------------- |
| `/drink_list`  | GET    | List all users            |
| `/drink_list`  | POST   | Authenticate user login   |
| `/order_list`  | GET    | List all orders           |
| `/order_list`  | POST   | Create a new order        |

