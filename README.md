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

### 6. Error Handling
#### Common Error Responses:

```bash
{
  "error": {
    "message": "Error message",
    "statusCode": 400
  }
}
```
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
```bash
This README provides a structured overview of the project, including setup instructions, error handling, testing, deployment, contribution guidelines and contact information.
