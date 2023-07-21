"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

import "../css/login.css";

export default function page() {
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [switchState, setSwitchState] = useState("login");
  const [loginReq, setLoginReq] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [registerReq, setRegisterReq] = useState<RegisterRequest>({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const showErrorMessage = (message: string) => {
    const errorDiv = errorRef.current;

    if (errorDiv) {
      errorDiv.innerHTML = message;
      errorDiv.style.top = "0";
    }

    setTimeout(() => {
      if (errorDiv) {
        errorDiv.style.top = "-6vh";
      }
    }, 2500);
  };

  const showSuccessMessage = (message: string) => {
    const successDiv = successRef.current;

    if (successDiv) {
      successDiv.innerHTML = message;
      successDiv.style.top = "0";
    }

    setTimeout(() => {
      if (successDiv) {
        successDiv.style.top = "-6vh";
      }
    }, 2500);
  };

  const loginHandler = async () => {
    if (loginReq.email === "") {
      showErrorMessage("Email is required");
    }
    if (loginReq.password === "") {
      showErrorMessage("Password is required");
    }
    const loginRequest = {
      email: loginReq.email,
      password: loginReq.password,
    };
    try {
      const response = await fetch("/api/user", {
        method: "GET",
        body: JSON.stringify(loginRequest),
      });
      if (response.status === 200) {
        showSuccessMessage("Logged in successfully");
        window.location.href = "/";
      } else if (response.status === 400) {
        showErrorMessage("User bot found");
      } else if (response.status === 401) {
        showErrorMessage("Wrong password");
      }
    } catch (err) {
      console.error(err);
      showErrorMessage("Something went wrong");
    }
  };

  const registerHandler = async () => {
    if (registerReq.email === "") {
      showErrorMessage("Email is required");
    }
    if (registerReq.username === "") {
      showErrorMessage("Username is required");
    }
    if (registerReq.password === "") {
      showErrorMessage("Password is required");
    }
    if (registerReq.repeatPassword === "") {
      showErrorMessage("Repeat password is required");
    }
    if (registerReq.password !== registerReq.repeatPassword) {
      showErrorMessage("Passwords don't match");
    }

    const registerRequest = {
      email: registerReq.email,
      username: registerReq.username,
      password: registerReq.password,
    };

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(registerRequest),
      });
      if (response.status === 200) {
        showSuccessMessage("User created successfully");
      } else if (response.status === 400) {
        showErrorMessage("User already exists");
      } else {
        showErrorMessage("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      showErrorMessage("Something went wrong");
    }
  };

  return (
    <div id="login_main_container">
      <div className="error_message" ref={errorRef}></div>
      <div className="success_message" ref={successRef}></div>
      <div className="login_container">
        {/* Logo */}
        <Image
          src="/image/logo.ico"
          className="login_logo"
          alt="logo"
          width={100}
          height={100}
        />
        {/* Login & Register Switch */}
        <div className="login_register_switch">
          <div
            className={`login_switch ${
              switchState === "login" ? "active" : ""
            }`}
            onClick={() => {
              setSwitchState("login");
            }}
          >
            <p>Login</p>
          </div>
          <div
            className={`register_switch ${
              switchState === "register" ? "active" : ""
            }`}
            onClick={() => {
              setSwitchState("register");
            }}
          >
            <p>Register</p>
          </div>
        </div>
        {/* Login Form */}
        <div
          className="login_form"
          style={{ display: switchState === "login" ? "flex" : "none" }}
        >
          <div className="form_control">
            <label htmlFor="login_email">
              <MdEmail />
            </label>
            <input
              type="email"
              id="login_email"
              placeholder="Enter your Email"
              onChange={(e) => {
                setLoginReq({ ...loginReq, email: e.target.value });
              }}
            />
          </div>
          <div className="form_control">
            <label htmlFor="login_password">
              <RiLockPasswordFill />
            </label>
            <input
              type="password"
              id="login_password"
              placeholder="Enter your password"
              onChange={(e) => {
                setLoginReq({ ...loginReq, password: e.target.value });
              }}
            />
          </div>
          <button id="login_btn" onClick={loginHandler}>
            Login
          </button>
        </div>
        {/* Register Form */}
        <div
          className="register_form"
          style={{ display: switchState === "register" ? "flex" : "none" }}
        >
          <div className="form_control">
            <label htmlFor="register_email">
              <MdEmail />
            </label>
            <input
              type="email"
              id="register_email"
              placeholder="Enter your email"
              onChange={(e) => {
                setRegisterReq({ ...registerReq, email: e.target.value });
              }}
            />
          </div>
          <div className="form_control">
            <label htmlFor="register_username">
              <BiSolidUser />
            </label>
            <input
              type="text"
              id="register_username"
              placeholder="Enter your username"
              onChange={(e) => {
                setRegisterReq({ ...registerReq, username: e.target.value });
              }}
            />
          </div>
          <div className="form_control">
            <label htmlFor="register_password">
              <RiLockPasswordFill />
            </label>
            <input
              type="password"
              id="register_password"
              placeholder="Enter your password"
              onChange={(e) => {
                setRegisterReq({ ...registerReq, password: e.target.value });
              }}
            />
          </div>
          <div className="form_control">
            <label htmlFor="register_password_confirm">
              <RiLockPasswordFill />
            </label>
            <input
              type="password"
              id="register_password_confirm"
              placeholder="Repeat your password"
              onChange={(e) => {
                setRegisterReq({
                  ...registerReq,
                  repeatPassword: e.target.value,
                });
              }}
            />
          </div>
          <button id="register_btn" onClick={registerHandler}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
