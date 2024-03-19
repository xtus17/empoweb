import "./App.css";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Footer from "./Components/Footer";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AuthProvider } from "./utils/authContext";
import Add from "./Components/Add";
import DeleteUser from "./Components/DeleteUser";
import Report from "./Components/Report";
import Demuna from "./Components/Demuna";

function App() {
  // const location = useLocation();
  return (
    <>
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <Add />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delete"
              element={
                <ProtectedRoute>
                  <DeleteUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demuna"
              element={
                <ProtectedRoute>
                  <Demuna />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
