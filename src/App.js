import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login/login";
import Signup from "./components/Authentication/Signup/Signup";
import RequireRole from "./utils/RequireRole";
import NotFoundView from "../src/components/FallbackComponents/NotFound/Error404";
import Homepage from "./components/Homepage/Index";
import NavBar from "../src/components/Navbar/Index";
import PersistLogin from "./utils/PersistLogin";
import UserProfile from "./components/UserProfile/UserProfile";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireRole roleName={[]} />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}

export default App;
