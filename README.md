# Contacts Project (Contacts API)

A small RESTful API for managing user-specific contacts. Built with Node.js, Express, MongoDB and JWT-based authentication. Ideal as a backend for a contacts web/mobile app.

## Features
- User registration and login (JWT)
- Password hashing with bcrypt
- CRUD operations for contacts: create, read (list & single), update, delete
- Each contact is linked to a user; users can only access their own contacts
- Ready for hosting (Render) and local development

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt for password hashing
- express-async-handler for cleaner async controllers
