import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../commons/Loader/Loader";

import "./Signup.css";

function SignupPage() {
  const [formData, setFormData] = useState({
    userName: "",
    imageURL: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
  });

  const [loader, setLoader] = useState(false);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoader(true);
      setFormData({ ...formData, imageURL: "imageURL" });
      axios
        // .post("http://3.145.76.78:3001/auth/register", formData)
        .post("http://18.189.17.119:3001/auth/register", formData)
        .then((response) => {
          setLoader(false);
          navigate("/sign-in");
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Username validation
    if (!formData.userName.trim()) {
      isValid = false;
      newErrors.userName = "Username is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      isValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      newErrors.email = "Email is invalid";
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      isValid = false;
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      isValid = false;
      newErrors.phoneNumber = "Phone Number must contain only numbers";
    }

    // Password validation
    if (!formData.password) {
      isValid = false;
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      isValid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    // Address validation
    if (!formData.address.trim()) {
      isValid = false;
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <form class="signup-form" onSubmit={handleSubmit} noValidate>
      {loader ? <Loader /> : ""}
      <h1>Register</h1>
      <div class="signup-input-subsection">
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        {errors.userName && <p className="error">{errors.userName}</p>}
      </div>

      <div class="signup-input-subsection">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div class="signup-input-subsection">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      </div>

      <div class="signup-input-subsection">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div class="signup-input-subsection">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupPage;
