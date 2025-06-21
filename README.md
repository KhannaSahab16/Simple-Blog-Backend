# 🚀 Simple Blog Backend (v2)

A powerful backend API for a complete blogging platform where users can:

- 📝 Create, read, update, delete blog posts  
- 🔐 Authenticate & secure their actions via JWT  
- ❤️ Like, 📌 bookmark, 🏷️ tag posts  
- 💬 Comment with threading  
- 📊 View real-time platform analytics  
- 🧠 Manage content via full admin control

Built using **Node.js**, **Express**, **MongoDB**, and tested thoroughly with **Postman**.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **JWT** for authentication
- **Postman** (API testing)

---

## ✨ Core Features

- 🔐 **User Authentication (JWT)**  
  Register, Login, Auth middleware

- 📝 **Blog CRUD**  
  Create, Read, Update, Delete blog posts  
  Protected routes – only post owners can edit/delete

- 🧑 **Post Ownership & Auth Checks**  
  Users can only modify their own posts

- 💬 **Comments System**  
  Add/view/delete comments per post  
  Post authors can also delete comments

- ❤️ **Like System**  
  Toggle likes on posts; count likes dynamically

- 📌 **Bookmark System**  
  Bookmark/unbookmark posts; view in profile

- 🏷️ **Tag-based Filtering + Search**  
  Filter posts by tag or keyword

- 📦 **Pagination Support**  
  Paginated `GET /posts?page=n` for large datasets

- 📊 **Analytics Dashboard**  
  Platform-wide stats on users, posts, likes, bookmarks  
  Top liked/bookmarked posts, most active users

- 🧠 **Admin Panel**  
  Admin can:
  - View all users
  - Delete any post/comment
  - Freeze/unfreeze users (prevent posting)
  - Promote users to admin
  - View full admin summary dashboard

---

## 📁 Folder Structure

<pre>
simple-blog-backend/
├── index.js
├── routes/
│   ├── auth.js
│   ├── posts.js
│   ├── comments.js
│   ├── users.js
│   ├── analytics.js
│   └── admin.js
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
├── controllers/
│   ├── authController.js
│   └── commentController.js
├── utils/
│   ├── generateToken.js
├── package.json
├── .env
├── node_modules/
├── screenshots/ # Postman test screenshots
</pre>

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed  
- MongoDB running locally OR [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### 🔧 Installation & Run

<pre>
git clone https://github.com/KhannaSahab16/Simple-Blog-Backend.git
cd Simple-Blog-Backend
npm install
node index.js
</pre>

Server will run on: http://localhost:3000 (default)

---

## 🧪 API Testing via Postman

All endpoints can be tested via Postman (screenshots inside screenshots/ folder).

📝 Public Routes
| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register new user   |
| POST   | `/api/auth/login`    | Login and get token |


🔐 Protected Blog Routes
| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/api/posts`     | Create a new post          |
| GET    | `/api/posts`     | Get paginated posts        |
| GET    | `/api/posts/:id` | Get single post + comments |
| PUT    | `/api/posts/:id` | Update your post           |
| DELETE | `/api/posts/:id` | Delete your post           |

💬 Comments Routes
| Method | Endpoint                | Description                       |
| ------ | ----------------------- | --------------------------------- |
| POST   | `/api/comments/:postId` | Add comment to post               |
| DELETE | `/api/comments/:id`     | Delete comment (self/post author) |

❤️ Likes & 📌 Bookmarks
| Method | Endpoint                      | Description                       |
| ------ | ----------------------------- | --------------------------------- |
| PUT    | `/api/posts/like/:id`         | Like/unlike a post                |
| PUT    | `/api/users/bookmark/:postId` | Bookmark/unbookmark               |
| GET    | `/api/users/profile`          | View user bookmarks, likes, stats |

📊 Analytics Routes
| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| GET    | `/api/analytics/dashboard` | Platform-wide metrics |

🧠 Admin Routes
| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | `/api/admin/users`        | View all users           |
| DELETE | `/api/admin/posts/:id`    | Delete any post          |
| DELETE | `/api/admin/comments/:id` | Delete any comment       |
| PUT    | `/api/admin/promote/:id`  | Promote user to admin    |
| PUT    | `/api/admin/freeze/:id`   | Freeze/unfreeze user     |
| GET    | `/api/admin/summary`      | View user/post analytics |


🧠 Author

Mehul Khanna

🧠 Backend Dev Intern · Clean Architecture Fan · Builder of Bold Ideas
