# Course Review Platform

## Introduction

This project is an enhanced version of a course management system backend, incorporating robust user authentication, authorization, and user-related information. The backend is developed using Express.js, MongoDB, Mongoose, and TypeScript.

## Features

### User Authentication and Authorization

- **User Registration:** Users can register with a unique username, email, and securely hashed password.
- **User Login:** Users can log in with their username and password to receive a JWT token for authenticated access.
- **Change Password:** Users can change their password, ensuring it is unique and not among the last two used passwords.
- **Role-Based Access Control:** Users can have roles such as 'user' or 'admin', determining their access level and permissions.

### Course Management

- **Create Course (Admin Only):** Admins can create new courses by providing detailed information, including title, instructor, category, price, tags, start date, end date, language, provider, duration, level, and description.
- **Update Course (Admin Only):** Admins can update existing course details.
- **Get Course by ID with Reviews:** Retrieve detailed information about a specific course along with its reviews.
- **Get Best Course:** Fetch the highest-rated course based on average review ratings and the total number of reviews.
- **Paginated and Filtered Courses:** Users can get a list of courses with pagination and various filters.

### Category Management

- **Create Category (Admin Only):** Admins can create new course categories.
- **Get All Categories:** Retrieve a list of all available course categories.

### Review Management

- **Create Review (User Only):** Users can submit reviews for courses, providing ratings and comments.

### Error Handling

- Proper error handling is implemented throughout the application.
- Global error handling middleware is utilized to catch and handle errors, providing appropriate error responses with status codes and error messages.

## Additional Features

### Dynamic Update

- The system supports partial updates for courses, allowing users to update specific fields without affecting the rest of the course details.

### Tag Management

- Users can update tags associated with a course, including adding new tags and marking existing tags as deleted.

### Search and Filter Functionality

- Users can search for courses based on various parameters such as title, price, start date, end date, language, provider, duration, level, and category.
- Filtering options include price range, tags, language, provider, duration, level, start date, and end date.

### Pagination

- Results are paginated to improve performance and user experience.

### Average Rating Calculation

- The system calculates the average rating for each course based on user reviews.

## Models

### User Model

```javascript
{
    _id: ObjectId,
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: Date,
    updatedAt: Date
}
```

### Course Model

```javascript
{
    _id: ObjectId,
    title: String,
    instructor: String,
    categoryId: ObjectId,
    price: Number,
    tags: [{ name: String, isDeleted: Boolean }],
    startDate: String,
    endDate: String,
    language: String,
    provider: String,
    durationInWeeks: Number,
    details: {
        level: String,
        description: String
    },
    createdBy: ObjectId,
    createdAt: Date,
    updatedAt: Date
}
```

### Category Model

```javascript
{
    _id: ObjectId,
    name: String,
    createdBy: ObjectId,
    createdAt: Date,
    updatedAt: Date
}
```

### Review Model

```javascript
{
    _id: ObjectId,
    courseId: ObjectId,
    rating: Number,
    review: String,
    createdBy: ObjectId,
    createdAt: Date,
    updatedAt: Date
}
```

## API Endpoints

### Authentication

- **User Registration:** `POST /api/auth/register`
- **User Login:** `POST /api/auth/login`
- **Change Password:** `POST /api/auth/change-password`

### Courses

- **Create a Course:** `POST /api/course`
- **Get Paginated and Filtered Courses:** `GET /api/courses`
- **Update a Course:** `PUT /api/courses/:courseId`
- **Get Course by ID with Reviews:** `GET /api/courses/:courseId/reviews`
- **Get the Best Course Based on Average Review (Rating):** `GET /api/course/best`

### Categories

- **Create a Category:** `POST /api/categories`
- **Get All Categories:** `GET /api/categories`

### Reviews

- **Create a Review:** `POST /api/reviews`

### Technology

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **TypeScript**

**To run the application locally, you have installed following on you divice**

- Node.js

* npm

- TypeScript (install -g typescript)

# Installation

Some basic info for clone the application

```
> Clone the repository
  run this command (for clone): https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-alhabib5565.git
> Install all dependencies:
  npm install
```
