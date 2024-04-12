import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../services/opertaions/authApi";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // for passwords

  const [showPassword, setShowPassword] = useState(false);

  function handelonChange(e) {
    e.preventDefault();

    const { name, value } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function handelonSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;
    dispatch(login(email, password, navigate));
  }

  return (
    <form
      onSubmit={handelonSubmit}
      className="flex flex-col w-full gap-y-4 mt-6 text-white"
    >
      <label className="w-full">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
          Email Adress
          <sup className=" text-pink-300">*</sup>
        </p>

        <input
          className="bg-gray-100 border-none rounded-md text-gray-400 w-full p-[12px] focus:outline-none focus:outline-blue-400"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          required
          onChange={handelonChange}
        />
      </label>

      <label className="relative w-full ">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
          Password <sup className="text-pink-300">*</sup>
        </p>

        <input
          type={showPassword ? "text" : "password"}
          className="bg-gray-100 border-none rounded-md  text-gray-400 w-full p-[12px]  focus:outline-none focus:outline-blue-400"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          required
          onChange={handelonChange}
        />
        <span
          className=" cursor-pointer absolute top-[38px] text-black right-2 "
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} />
          ) : (
            <AiOutlineEye fontSize={24} />
          )}{" "}
        </span>

        <Link to={"/forgot-password"}>
          <p className="text-xs mt-2 max-w-fit ml-auto text-blue-300">
            Forgot password
          </p>
        </Link>
      </label>

      <button className="bg-yellow-500 mt-4 font-medium rounded-md text-black px-[12px] py-[8px]">
        Sign In{" "}
      </button>
    </form>
  );
};

export default LoginForm;
