# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
Task Management API

This project is a task management API built using Node.js, Express.js, MongoDB, and Mongoose. It provides endpoints for user authentication and task management, including creating, reading, updating, and deleting tasks.

Features

User Authentication

Register a new user: Validates input fields and creates a new user.

Login: Authenticates user credentials, generates JWT access tokens, and stores session data.

Task Management

Create a Task: Validates input fields and creates a new task in the database.

Retrieve All Tasks: Fetches and returns all tasks.

Retrieve a Single Task: Fetches and returns a task by its unique ID.

Update Task Status: Updates the status of a task, ensuring only valid statuses (pending, in-progress, completed) are allowed.

Delete a Task: Removes a task by its ID from the database.

Installation and Setup

Prerequisites

Node.js (v14 or higher)

MongoDB

npm or yarn

Steps to Run Locally

Clone the Repository:

git clone <repository-url>
cd <project-folder>

Install Dependencies:

npm install
# or
yarn install

Set Up Environment Variables:
Create a .env file in the root directory and include the following:

MONGO_URI=<your-mongodb-uri>
SECRET_KEY=<your-secret-key>

Start the Server:

npm start
# or
yarn start

Test the Endpoints:
Use an API testing tool like Postman or Insomnia to test the endpoints.

API Endpoints

Authentication

Register

POST /api/auth/register

Request Body:

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}

Response:

{
  "_id": "<user-id>",
  "name": "John Doe",
  "email": "john.doe@example.com"
}

Login

POST /api/auth/login

Request Body:

{
  "email": "john.doe@example.com",
  "password": "securepassword"
}

Response:

{
  "message": "Login successful",
  "accessToken": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}

Task Management

Create Task

POST /api/tasks

Request Body:

{
  "title": "Task Title",
  "description": "Task Description"
}

Response:

{
  "message": "Task created successfully",
  "task": {
    "_id": "<task-id>",
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
}

Get All Tasks

GET /api/tasks

Response:

{
  "message": "Tasks retrieved successfully",
  "tasks": [
    {
      "_id": "<task-id>",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending"
    }
  ]
}

Get Single Task

GET /api/tasks/:id

Response:

{
  "message": "Task retrieved successfully",
  "task": {
    "_id": "<task-id>",
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
}

Update Task Status

PUT /api/tasks/:id

Request Body:

{
  "status": "in-progress"
}

Response:

{
  "message": "Task status updated successfully",
  "task": {
    "_id": "<task-id>",
    "status": "in-progress"
  }
}

Delete Task

DELETE /api/tasks/:id

Response:

{
  "message": "Task deleted successfully",
  "task": {
    "_id": "<task-id>",
    "title": "Task Title",
    "description": "Task Description"
  }
}

Error Handling

Code

Description

400

Bad Request (e.g., Missing fields, Validation errors)

401

Unauthorized (e.g., Invalid credentials)

404

Not Found (e.g., Task not found)

500

Internal Server Error

Dependencies

bcryptjs: Hash passwords securely.

jsonwebtoken: Generate and verify JWT tokens.

express: Web framework.

mongoose: MongoDB object modeling.

Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features or bug fixes.

License

This project is licensed under the MIT License. See the LICENSE file for details.

