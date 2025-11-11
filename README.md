# ⚛️ React User Management Application

This is a **frontend-only** React application designed to simulate basic user account creation and management. It leverages **React Router (v6)** for navigation, the **Context API** for global state management, and **Bootstrap 5** for modern, responsive styling.

⚠️ **Important Note:** User data and authentication state are persisted using the browser's **Local Storage** *strictly for demonstration purposes*. **This approach is inherently insecure and should not be used for production-level applications.**

---

## 🚀 Getting Started

### Prerequisites

To run this application, you will need:

* **Node.js** (LTS version recommended)
* **npm** or **yarn**

### Installation

If you are starting from scratch:

1.  **Create a React App:**
    ```bash
    npx create-react-app user-management-app
    cd user-management-app
    ```

2.  **Install Dependencies:**
    This project requires `react-router-dom` (v6) and `bootstrap`.
    ```bash
    npm install react-router-dom bootstrap
    # or
    yarn add react-router-dom bootstrap
    ```

3.  **Replace Files:**
    Copy the provided code for `src/App.js`, `src/index.js`, and the files within `src/components/` and `src/context/` into your project structure.

4.  **Run the Application:**
    ```bash
    npm start
    # or
    yarn start
    ```

---

## ✨ Application Features

| Path | Component | Description |
| :--- | :--- | :--- |
| `/login` | `LoginPage` | Users can log in with a registered username and password. |
| `/register` | `RegistrationPage` | Users can create a new account, which is securely stored in Local Storage (simulated). |
| `/account` | `AccountPage` | **Protected Route.** Authenticated users can view their details and edit their name and/or change their password. |

* **Navigation:** A **dynamic navigation bar** that changes based on the user's authentication status (shows **Login/Register** or **Account/Logout**).
* **Styling:** Uses **Bootstrap 5** for a responsive and clean design, providing a familiar UI.

---

## 🔑 Authentication & Data Persistence (Simulated)

This application uses **browser Local Storage** to simulate a backend database and session management.

* `localStorage.getItem('users')`: Stores an array of all registered user objects (including passwords, which is **insecure** in a real application).
* `localStorage.getItem('currentUser')`: Stores the currently logged-in user's details (excluding password) to maintain the session.
* `localStorage.getItem('isAuthenticated')`: Stores a boolean flag to quickly check the login status.

---

## ⚙️ Code Quality & Structure

* **Context API:** Utilizes the `AuthContext` to manage the global authentication state (`isAuthenticated`, `currentUser`, and login/logout functions), making it easily accessible via the custom `useAuth` hook.
* **React Router v6:** Employs the modern `<Routes>` and `<Route>` components for clean routing and the `useNavigate` hook for programmatic navigation.
* **Conditional Rendering:** Components like `Navbar` and `Account` conditionally render content or redirect based on the central `isAuthenticated` state.
* **Comments:** Appropriate comments are used throughout the code to explain the purpose of key functions, state management, and lifecycle effects.

---

## ⚠️ Error Handling

The application includes client-side validation and state management error handling:

* **Form Validation:** Basic checks for required fields, password length constraints, and password matching are performed on the client side.
* **Authentication Errors:**
    * **Registration:** Handles and displays an error if the chosen **username** (the unique identifier) is already taken.
    * **Login:** Handles and displays an error for **invalid credentials** (incorrect username or password).
    * **Account Update:** Includes validation checks for updates and handles the unlikely event of a "user not found" scenario.
* **Protected Routes:** The `Account.js` component checks for authentication status and uses the `<Navigate to="/login" replace />` component to gracefully **redirect unauthenticated users** to the login page.