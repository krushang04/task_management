import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/auth/Login";
import TaskList from "./components/tasks/TaskList";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return <div className="App">{user ? <TaskList /> : <Login />}</div>;
};

const RootApp = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default RootApp;
