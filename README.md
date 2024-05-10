# React and Django Todo Project using chakra-ui

This project is an implementation of a Todo application using Django Rest Framework as the backend and React for the frontend. The React app (`todo-app`) is set up alongside Django applications to create a full-stack web application that manages todo lists.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete Todos.
- **Searching**: Searching based on todos title .
- **Filtering**: Filter todos based on priority, completeness and due date.
- **API Endpoints**
    - /api/todos/
- **Real-Time Updates**: Utilizes efficient communication between the frontend and backend to ensure state is synchronized across all clients.

## Demo

Here you can include a GIF or a set of screenshots demonstrating the application's functionality:
<img width="750" alt="image" src="./assets/todo-visual.png">


## Local Setup Guidelines

### Backend Setup (Django)

1. Clone the repository:
   ```bash
   git clone https://github.com/zeeshan-amir/to-do-app.git
   cd to-do-app
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip3 install -r requirements.txt
   ```

4. Migrate the database:
   ```bash
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```

5. Run the server:
   ```bash
   python3 manage.py runserver
   ```

### Frontend Setup (React)

1. Navigate to the React application directory:
   ```bash
   cd todo-app
   ```

2. Install npm packages:
   ```bash
   npm install
   ```

3. Add the environment file:
   ```bash
   touch .env
   Add the VITE_APP_BASE_URL= 'http://localhost:8000' for development env
   ```

4. Start the React development server:
   ```bash
   npm run dev
   ```

## How to Run Test Cases

To run the test cases for both the backend and frontend:

### Backend Tests

```bash
python manage.py test
```

### Frontend Tests

```bash
cd todo-app
npm run test
```

## Conclusion

This README provides all necessary information to get the project set up locally, run tests, and understand the API.
Collapse
