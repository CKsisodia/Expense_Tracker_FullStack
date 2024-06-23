import { Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <Auth>
              <Login />
            </Auth>
          }
        />
        <Route
          path="/signup"
          element={
            <Auth>
              <Signup />
            </Auth>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Auth>
              <ForgotPassword />
            </Auth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
