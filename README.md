# 🚀 Simple Blog Backend

A **backend API** for a simple blogging platform where users can **create**, **read**, **update**, and **delete** blog posts.  
Built with **Node.js**, **Express**, and **MongoDB**.  
Tested with **Postman** as a fake frontend.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ODM)
- **Postman** (for API testing)

---

## ✨ Features

- Create new blog posts  
- Read all posts or a specific post  
- Update posts by ID  
- Delete posts by ID  

---

## 📁 Folder Structure

<pre> ```plaintext simple-blog-backend/ ├── index.js ├── routes/ │ └── posts.js ├── models/ │ └── Post.js ├── package.json ├── node_modules/ ├── screenshots/ # Postman API test screenshots ``` </pre>


## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed  
- MongoDB running locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installation & Run (In GitBash / CMD Terminal)

# Clone this repo
git clone https://github.com/KhannaSahab16/Simple-Blog-Backend.git
cd Simple-Blog-Backend

# Install dependencies
npm install

# Start the server
node index.js
Server will run on: http://localhost:3000 (default)

🧪 API Testing
Use Postman to test API endpoints:
| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| POST   | `/posts`     | Create a new blog post |
| GET    | `/posts`     | Get all blog posts     |
| GET    | `/posts/:id` | Get a post by ID       |
| PUT    | `/posts/:id` | Update a post by ID    |
| DELETE | `/posts/:id` | Delete a post by ID    |

You can find the Postman request screenshots inside the screenshots/ folder as proof of working endpoints.

Author
Mehul Khanna
