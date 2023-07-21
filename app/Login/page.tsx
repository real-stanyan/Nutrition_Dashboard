"use client";

import { useState } from "react";
import Image from "next/image";

import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

import "../css/login.css";

export default function page() {
  const [switchState, setSwitchState] = useState("login");
  const [loginReq, setLoginReq] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [registerReq, setRegisterReq] = useState<RegisterRequest>({
    email: "",
    username: "",
    password: "",
  });

  return (
    <div id="login_main_container">
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
            />
          </div>
          <button id="login_btn">Login</button>
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
            />
          </div>
          <button id="register_btn">Register</button>
        </div>
      </div>
    </div>
  );
}
