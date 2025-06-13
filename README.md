# Simple Blog Backend

This is the backend API for a simple blogging platform where users can create, read, update, and delete blog posts. The backend is built with Node.js, Express, and MongoDB. Postman was used as a fake frontend to test all API endpoints.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Postman (for API testing)

---

## Features

- Create new blog posts
- Read existing posts
- Update posts by ID
- Delete posts by ID

---

## Folder Structure

simple-blog-backend/
├── index.js
├── routes/
│ └── posts.js
├── models/
│ └── Post.js
├── package.json
├── node_modules/
├── screenshots/ # Contains Postman API test screenshots


## Getting Started

### Prerequisites

- Node.js installed
- MongoDB running locally or a MongoDB Atlas URI

### Installation

1. Clone the repo:
git clone https://github.com/KhannaSahab16/Simple-Blog-Backend.git
cd Simple-Blog-Backend

2.Install dependencies:
npm install

3.Start the server:
node index.js
The server will start on http://localhost:3000 (or your configured port).

API Testing
Use Postman to test the API endpoints. You can perform the following actions:
Create a post (POST /posts)
Get all posts (GET /posts)
Get a post by ID (GET /posts/:id)
Update a post by ID (PUT /posts/:id)
Delete a post by ID (DELETE /posts/:id)
You can find the Postman request screenshots inside the screenshots/ folder as proof of working endpoints.

Author
Mehul Khanna
