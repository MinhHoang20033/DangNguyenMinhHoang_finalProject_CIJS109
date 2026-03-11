import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import ProjectDetail from "./pages/ProjectDetail";
import EmployeeDetail from "./pages/EmployeeDetail";
import AddEmployee from "./pages/AddEmployee";

import SidebarLayout from "./components/SidebarLayout";

import AuthProvider, { AuthContext } from "./context/AuthContext";

import { useContext } from "react";


function PrivateRoute({ children }) {

  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function PublicRoute({ children }) {

  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/projects" replace />;
  }

  return children;
}


function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* Login page */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Protected pages */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <SidebarLayout />
              </PrivateRoute>
            }
          >

            <Route path="projects" element={<Projects />} />

            <Route path="projects/:id" element={<ProjectDetail />} />

            <Route path="employees" element={<Employees />} />

            <Route path="employees/add" element={<AddEmployee />} />

            <Route path="employees/:id" element={<EmployeeDetail />} />

          </Route>

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  );
}

export default App;