import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "rgb(191 168 168)",
      }}
    >
      <Link
        to="/"
        style={{ textDecoration: "none", color: "black", fontSize: "24px" }}
      >
        Memopss
      </Link>
      {auth?.token ? (
        <Link to="/user-profile">
          <FaUserCircle size={30} />
        </Link>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
