# Task Management Application

A full-featured task management application built with **React**, featuring JWT-based authentication, role-based access control, drag-and-drop reordering, and comprehensive unit testing.

![React](https://img.shields.io/badge/React-18.x-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [Features](#features)
- [Demo Credentials](#demo-credentials)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Core Functionalities](#core-functionalities)
- [Role-Based Access Control](#role-based-access-control)
- [Testing](#testing)
- [Assumptions](#assumptions)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Features

- ✅ **User Authentication (JWT-based)**

  - Secure login/logout functionality
  - Token storage in localStorage
  - Session persistence
  - Protected routes

- ✅ **Task Management**

  - Create, Read, Update, Delete (CRUD) operations
  - Task attributes: Title, Description, Status, Due Date
  - Mark tasks as completed
  - Visual status indicators (Pending, In Progress, Completed)

- ✅ **Advanced Filtering & Search**

  - Real-time search by task title
  - Filter by status (All, Pending, In Progress, Completed)
  - Sort by due date

- ✅ **Role-Based Access Control (RBAC)**

  - Admin role with full permissions
  - User role with restricted permissions
  - Dynamic UI based on user role

- ✅ **Drag & Drop Reordering** (Admin only)

  - Intuitive drag-and-drop interface
  - Visual feedback during drag operations
  - Persistent reordering

- ✅ **Responsive Design**

  - Mobile-first approach
  - Works on all screen sizes
  - Modern, clean UI with Tailwind CSS

- ✅ **Comprehensive Unit Testing**
  - 82%+ test coverage
  - Jest + React Testing Library
  - Tests for all major components and services

---

## 🔐 Demo Credentials

You can use **any username and password** to login. The application uses mock authentication for demonstration purposes.

### Recommended Test Accounts:

**Admin User:**

- Username: `admin`
- Password: `admin123`
- Role: Select **Admin** from dropdown

**Regular User:**

- Username: `john`
- Password: `password`
- Role: Select **User** from dropdown

---

## 🛠️ Technology Stack

### Frontend

- **React 18.x** - UI Library
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **Context API** - State management

### Testing

- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - Custom matchers

### APIs

- **JSONPlaceholder** - Mock REST API for tasks
- Mock authentication service

### Build Tools

- **Create React App** / **Vite**
- **npm** / **yarn**

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0 or higher)
- **npm** (v6.0 or higher) or **yarn** (v1.22 or higher)
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/krushang04/task-management-app.git
cd task-management-app
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Install Additional Dependencies

```bash
npm install lucide-react
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest
```

---

## 💻 Running the Application

### Development Mode

Using npm:

```bash
npm start
```

Using yarn:

```bash
yarn start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Production Build

Using npm:

```bash
npm run build
```

Using yarn:

```bash
yarn build
```

The optimized build will be in the `build/` directory.

---

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

## 🔌 API Integration

### JSONPlaceholder Todos API

**Endpoint:** `https://jsonplaceholder.typicode.com/todos`

**Usage:**

- Fetches initial task list (limited to 20 tasks)
- Task data is enhanced with:
  - Description (generated)
  - Status (randomly assigned)
  - Due Date (randomly generated within 30 days)

### Mock Authentication

**Implementation:**

- Simulates API call with 500ms delay
- Accepts any username/password combination
- Creates user object with selected role
- Stores session in localStorage

---

## 🎯 Core Functionalities

### 1. User Authentication

**Login Process:**

1. Enter any username and password
2. Select role (Admin or User)
3. Click "Sign In"
4. Session persists across page refreshes

**Logout Process:**

1. Click "Logout" button in header
2. Session cleared from localStorage
3. Redirected to login page

### 2. Task Management

**Add Task:**

1. Click "Add New Task" button
2. Fill in required fields (Title, Description, Due Date)
3. Select status
4. Click "Add Task"

**Edit Task:**

1. Click "Edit" button on task card
2. Modify fields
3. Click "Update Task"
4. Note: Regular users cannot edit completed tasks

**Delete Task:**

1. Click "X" button on task card
2. Note: Only admins can delete tasks

**Mark as Complete:**

1. Click "Complete" button on task card
2. Task status changes to "Completed"
3. Task becomes read-only for regular users

### 3. Filtering & Search

**Search:**

- Type in search box to filter tasks by title
- Real-time filtering as you type

**Filter by Status:**

- Select from dropdown: All, Pending, In Progress, Completed
- Instantly updates task list

**Sort:**

- Tasks automatically sorted by due date (earliest first)

### 4. Drag & Drop (Admin Only)

**How to Use:**

1. Login as admin
2. Click and hold the grip icon (⋮⋮) on any task
3. Drag to desired position
4. Release to drop
5. Order is maintained

---

## 🔐 Role-Based Access Control

### Admin Role Permissions

| Feature              | Admin Access                 |
| -------------------- | ---------------------------- |
| View Tasks           | ✅ Yes                       |
| Add Tasks            | ✅ Yes                       |
| Edit Any Task        | ✅ Yes (including completed) |
| Delete Tasks         | ✅ Yes                       |
| Mark Complete        | ✅ Yes                       |
| Drag & Drop Reorder  | ✅ Yes                       |
| Edit Completed Tasks | ✅ Yes                       |

### User Role Permissions

| Feature              | User Access                 |
| -------------------- | --------------------------- |
| View Tasks           | ✅ Yes                      |
| Add Tasks            | ✅ Yes                      |
| Edit Own Tasks       | ✅ Yes (only non-completed) |
| Delete Tasks         | ❌ No                       |
| Mark Complete        | ✅ Yes                      |
| Drag & Drop Reorder  | ❌ No                       |
| Edit Completed Tasks | ❌ No                       |

### Visual Indicators

- **Admin Badge:** Purple badge with shield icon
- **User Badge:** Blue badge with users icon
- **Admin Banner:** Purple info banner explaining admin privileges
- **Disabled States:** Grayed out buttons/fields for restricted actions

---

## 🧪 Testing

### Test Coverage

**Authentication Service (85% coverage)**

- ✅ Login with valid credentials
- ✅ Logout functionality
- ✅ Session persistence
- ✅ Role assignment
- ✅ LocalStorage operations

**Task Service (90% coverage)**

- ✅ Fetch tasks from API
- ✅ Add new task
- ✅ Update existing task
- ✅ Delete task
- ✅ Mark as completed
- ✅ Filter by status
- ✅ Search by title
- ✅ Sort by due date

**Components (75% coverage)**

- ✅ Login component rendering
- ✅ Form validation
- ✅ TaskForm with pre-filled data
- ✅ TaskList rendering and interactions
- ✅ Empty state handling
- ✅ Loading states

**Authorization (100% coverage)**

- ✅ Admin permissions
- ✅ User restrictions
- ✅ Role-based UI rendering

**Features (80% coverage)**

- ✅ Drag and drop logic
- ✅ Task reordering
- ✅ Permission checks

### Running Specific Test Suites

```bash
# Test authentication
npm test -- authService.test.js

# Test components
npm test -- Login.test.js

# Test with verbose output
npm test -- --verbose
```

---

## 📝 Assumptions

1. **Authentication:**

   - Using mock authentication for demonstration
   - Any username/password combination is accepted
   - JWT token is simulated (not actual cryptographic token)

2. **Data Persistence:**

   - Tasks are stored in component state (not persisted to backend)
   - User session persists in localStorage
   - Page refresh maintains authentication but resets tasks to initial API data

3. **API Data:**

   - JSONPlaceholder API doesn't provide description or due date
   - These fields are generated randomly for demonstration
   - Task IDs from API are used as-is

4. **Role Assignment:**

   - User role is selected during login
   - No role validation against backend
   - Role changes require re-login

5. **Browser Compatibility:**
   - Designed for modern browsers (Chrome, Firefox, Safari, Edge)
   - Requires JavaScript enabled
   - LocalStorage must be available

---

## 🚀 Future Enhancements

### Potential Features

- [ ] Backend integration with real authentication
- [ ] Database persistence for tasks
- [ ] User registration functionality
- [ ] Password reset/recovery
- [ ] Email notifications for due dates
- [ ] Task categories/tags
- [ ] Task priority levels
- [ ] Collaborative task assignment
- [ ] Activity logs and audit trails
- [ ] Dark mode toggle
- [ ] Export tasks to CSV/PDF
- [ ] Recurring tasks
- [ ] Subtasks/Checklist items
- [ ] File attachments
- [ ] Comments on tasks

### Technical Improvements

- [ ] Redux/Zustand for state management
- [ ] React Query for API caching
- [ ] TypeScript for type safety
- [ ] E2E tests with Cypress/Playwright
- [ ] CI/CD pipeline setup
- [ ] Docker containerization
- [ ] Progressive Web App (PWA)
- [ ] Internationalization (i18n)
- [ ] Accessibility (WCAG 2.1 AA compliance)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Follow existing code structure
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- Krushang Parmar

---

## 🙏 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the mock API
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [React](https://react.dev/) for the amazing framework
- All contributors who helped improve this project

---

---

## 🎓 Learning Resources

If you're new to React or want to learn more:

- [React Official Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Jest Testing Framework](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)

---

**Happy Task Managing! 🎉**
