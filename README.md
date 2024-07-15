# Bike Service (Backend)

## Overview

This is the backend of the Bike Service application, built using Node.js, Express.js, and MongoDB as part of a MERN stack (MongoDB, Express.js, React, Node.js). It provides the API for interacting with the bike service application, including user management, service management, and booking operations.

### Features

- **User Management**: There are two types of users – owners and customers.

  - **Bike Station Owners**:
    - Create, edit, and delete all their services and details.
    - View a list of all bookings (pending, ready for delivery, and completed).
    - View details of each booking.
    - Mark a booking as ready for delivery.
    - Mark a booking as completed.
    - Receive an email whenever a booking is made.
    - Receive an email whenever a booking is cancelled.

  - **Customers**:
    - Register for an account with an email address and mobile number.
    - Book a service for a particular date.
    - See the status of their booking.
    - View all previous bookings.
    - Receive an email as soon as their booking is ready for delivery.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed.
- [Git](https://git-scm.com/) installed.
- [MongoDB](https://www.mongodb.com/) installed and running, or access to a MongoDB cloud instance.
- Access to a mail server for sending emails (if email notifications are enabled).

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <REPOSITORY_URL>
cd <PROJECT_DIRECTORY>
```

### 2. Install Dependencies
Navigate to the server directory and install the necessary dependencies:
```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the server directory with the following environment variables:

```bash
PORT=<PORT_NUMBER>                    # Port number for the server to run on (default is 5000)
MONGO_URI=<YOUR_MONGODB_URI>          # MongoDB connection URI
JWT_SECRET=<YOUR_JWT_SECRET>          # Secret key for JWT authentication
EMAIL_USER=<YOUR_EMAIL_USER>          # SMTP server username
EMAIL_PASSWORD=<YOUR_EMAIL_PASSWORD>  # SMTP server password
```

### 4. Start the Development Server
Start the server:
```bash
npm start
```
The server will run on http://localhost:<PORT_NUMBER>.

### 5. Schemas and Sample Data
#### User
- Schema:

```bash
{
  "email": "String",
  "password": "String",
  "role": "String",
  "entity": "ObjectId"
}

```
- Sample Data:
```bash
{
  "email": "jane.doe@example.com",
  "password": "hashedpassword",
  "role": "owner",
  "entity": "605c72ef3f1b2d1d7a7c6e46"
}
```
#### Customer
- Schema:
```bash
{
  "name": "String",
  "email": "String",
  "ph": "String"
}

```
- Sample Data:
```bash
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "ph": "123-456-7890"
}
```
#### Owner
- Schema:
```bash
{
  "name": "String",
  "email": "String",
  "ph": "String"
}

```
- Sample Data:
```bash
{
  "name": "Jack Doe",
  "email": "jack.doe@example.com",
  "ph": "123-456-7890"
}
```
#### Service
- Schema:
```bash
{
  "ownerId": "ObjectId",
  "name": "String",
  "description": "String",
  "price": "Number"
}
```
- Sample Data:
```bash
{
  "ownerId": "605c72ef3f1b2d1d7a7c6e46",
  "name": "Oil Change",
  "description": "Basic oil change service for bikes.",
  "price": 100
}

```
#### Booking
- Schema:

```bash
{
  "customerId": "ObjectId",
  "ownerId": "ObjectId",
  "serviceId": "ObjectId",
  "brand": "String",
  "model": "String",
  "year": "Number",
  "licensePlate": "String",
  "date": "ISODate",
  "status": "String"
}
```
- Sample Data:
```bash
{
  "customerId": "605c72ef3f1b2d1d7a7c6e45",
  "ownerId": "605c72ef3f1b2d1d7a7c6e46",
  "serviceId": "605c72ef3f1b2d1d7a7c6e47",
  "brand": "Yamaha",
  "model": "MT-07",
  "year": 2021,
  "licensePlate": "ABC1234",
  "date": "2024-07-15T00:00:00.000Z",
  "status": "pending"
}
```

## 6. API Reference
### Users Endpoint
#### Register a New User

```http
POST /api/users/register
```
Registers a new user as either an owner or a customer.

#### Request Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User's email address |
| `password` | `string` | **Required**. User's password |
| `role` | `string` | **Required**. Role of the user (`owner` or `customer`)|
| `name` | `string` | **Required**. User's name |
| `ph` | `string` | **Required**. User's phone number |

#### Response:
- `201 Created`: Successfully registered the user and returns the token and role.
- `409 Conflict`: Email is already registered.
- `400 Bad Request`: An error occurred during registration.

#### Login a User

```http
POST /api/users/login
```
Logs in an existing user.

#### Request Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User's email address |
| `password` | `string` | **Required**. User's password |


#### Response:
- `201 Created`: Successfully authenticated  the user and returns the token and role.
- `401 Unauthorized`: Invalid email or password.
- `500 Internal Server Error`: An error occurred during login.

### Services Endpoint
#### Create a New Service

```http
POST /api/services
```
Creates a new service by the authenticated owner.

#### Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Request Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Service name |
| `description` | `string` | **Required**. Service description |
| `price` | `number` | **Required**. Service price |

#### Response:
- `201 Created`: Successfully created the service.
- `400 Bad Request`: An error occurred during service creation.

#### Get All Services

```http
GET /api/services
```
Retrieves all services for customers and only the owner's services for owners.

#### Response:
- `200 OK`: Successfully returns the list of services.
- `403 Forbidden`: Unauthorized access.

#### Update Service by ID

```http
PUT /api/services/:id
```
Updates a specific service by its ID (owner only).

#### Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Request Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Service name |
| `description` | `string` | **Required**. Service description |
| `price` | `number` | **Required**. Service price |

#### Response:
- `200 OK`: Successfully updated the service.
- `404  Not Found`: Service not found.
- `400 Bad Request`: An error occurred during service update.

#### Delete  Service by ID

```http
DELETE /api/services/:id
```
Deletes a specific service by its ID (owner only).

#### Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Response:
- `200 OK`: Successfully deleted  the service.
- `404  Not Found`: Service not found.
- `400 Bad Request`: An error occurred during service deletion.

### Bookings Endpoint
#### Create a New Booking

```http
POST /api/bookings
```
Creates a new booking by a customer.

#### Request Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `serviceId` | `string` | **Required**. ID of the service being booked. |
| `date` | `string` | **Required**. Booking date.|
| `brand` | `string` | **Required**. Vehicle brand. |
| `model` | `string` | **Required**. Vehicle model.|
| `year` | `number` | **Required**. Vehicle year. |
| `licensePlate` | `string` | **Required**. Vehicle license plate. |

#### Response:
- `201 Created`: Successfully created the booking.
- `404  Not Found`: Customer or Service not found.
- `400 Bad Request`: Error creating the booking.

#### Get All Active Bookings for Customer

```http
GET /api/bookings/customer
```
Retrieves all active bookings for the authenticated customer.

#### Get All Active Bookings for Owner

```http
GET /api/bookings/
```
Retrieves all active bookings for the authenticated owner.

#### Response:
- `200 OK`: Successfully returns the list of active bookings.
- `404 Not Found`: No active bookings found.
- `500 Internal Server Error`: Error retrieving bookings.

#### Get All Completed Bookings for Customer

```http
GET /api/bookings/customer/completed
```
Retrieves all completed bookings for the authenticated customer.

#### Get All Completed  Bookings for Owner

```http
GET /api/bookings/completed
```
Retrieves all completed bookings for the authenticated owner.

#### Response:
- `200 OK`: Successfully returns the list of active bookings.
- `404 Not Found`: No active bookings found.
- `500 Internal Server Error`: Error retrieving bookings.

#### Update Booking Status

```http
PUT /api/bookings/:id
```
Updates the status of a booking by the authenticated owner.

#### Request Parameters:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the booking to update. |

#### Request Body:

| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `status` | `string` | **Required**. New status of booking (ready for delivery, completed). |

#### Response:

- `200 OK`: Successfully updated the booking status.
- `404 Not Found`: Booking not found.
- `400 Bad Request`: Error updating the booking.
- `403 Forbidden`: Booking status already completed.

#### Mark a Booking as Completed

```http
POST /api/bookings/:id/complete
```
Marks a booking as completed by the authenticated owner.

#### Request Parameters:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the booking to mark as completed. |

#### Response:

- `200 OK`: Successfully marked the booking as completed.
- `404 Not Found`: Booking not found.
- `400 Bad Request`: Error marking the booking as completed.

#### Cancel a Booking

```http
DELETE /api/bookings/:id
```
Marks a booking as completed by the authenticated owner.

#### Request Parameters:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the booking to cancel. |

#### Response:

- `200 OK`: Successfully canceled the booking.
- `404 Not Found`: Booking not found.
- `500 Internal Server Error`: Error canceling the booking.

### 7. Testing

- Testing Tools
    - Postman
    - Insomnia

- Running Tests
```bash
npm test
```
### 8. Deployment
- Ensure environment variables are set for production.
- Build and deploy using a cloud provider (e.g., AWS, Heroku, or DigitalOcean).
- Example for deploying to Heroku:
```bash
heroku create
git push heroku main
heroku run npm migrate
```

### 9. Contributing

- Contributing Guidelines:
    - Fork the repository.
    - Create a feature branch (git checkout -b feature/new-feature).
    - Commit your changes (git commit -am 'Add new feature').
    - Push to the branch (git push origin feature/new-feature).
    - Create a new Pull Request.

### 10. Contact

- Email: gurusuryaprakashr@gmail.com
