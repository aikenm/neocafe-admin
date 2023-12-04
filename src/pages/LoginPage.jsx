import axios from "axios";
import "../styles/pages/login_page.css";
import eyeOpen from "../images/eye-open.svg";
import eyeClosed from "../images/eye-closed.svg";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/adminSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, clearErrors } = useForm();
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        "https://www.ishak-backender.org.kg/api-admin/admin/login/",
        {
          login: data.username,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(loginSuccess(response.data.token));
        navigate("/main");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setInputError(true);
      setErrorMessage(error.response?.data?.message || error.message);
    }
  };

  const onSubmit = (data) => {
    handleLogin(data);
  };

  const onInputChange = (e, setter) => {
    setInputError(false);
    setErrorMessage("");
    clearErrors();
    setter(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login_block-wrapper">
        <h1 className="login_block-title">Вход</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-input-wrapper">
            <input
              type="text"
              placeholder="Логин"
              className={`login-input ${inputError ? "error" : ""}`}
              {...register("username", { required: true })}
              onChange={(e) => onInputChange(e, setUsername)}
            />
          </div>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              className={`password-input ${inputError ? "error" : ""}`}
              {...register("password", { required: true })}
              onChange={(e) => onInputChange(e, setPassword)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <img
                src={showPassword ? eyeOpen : eyeClosed}
                alt="Toggle visibility"
              />
            </button>
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={!username || !password}
          >
            Войти
          </button>
          {inputError && <span className="error-message">{errorMessage}</span>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
