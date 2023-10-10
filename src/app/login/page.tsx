"use client";

import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { MailOutline, Password } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

type Login = {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState<Login>({
    email:'',
    password:''
  })
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = event.target;

    setFormData((prevState:any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) =>{
    event.preventDefault();
    const { email, password } = formData;
    if (!email) {
        toast.error('Please provide email!');
        return;
    }

    if (!password) {
        toast.error('Please provide password!');
        return;
    }
  }

  return (
    <div className="mx-10 md:flex md:items-start md:justify-center md:pl-0 md:w-screen md:mr-0 md:pr-0 lg:table lg:my-16 xl:my-20 lg:w-[85vw] xl:w-[80vw] lg:m-auto">
      <div className="hidden lg:inline lg:bg-[#73d8ab] lg:h-full md:mt-8 lg:table-cell lg:w-[40vw] lg:shadow-lg lg:rounded-md lg:rounded-r-none lg:align-middle lg:text-center">
        <div className="lg:flex lg:items-center lg:justify-center lg:h-[100%] lg:m-auto">
          <div className="lg:bg-[#000000] lg:bg-opacity-10 lg:w-[70%] lg:py-14 lg:px-14">
            <div className="lg:flex lg:justify-start">
              <p className="lg:text-white lg:text-3xl lg:font-bold lg:max-w-[80%] xl:max-w-[100%] flex flex-col items-start">
                Campus <span className="text-[#113c29]">Communication</span>
              </p>
            </div>
            <p className="lg:mt-6 lg:text-white text-left xl:max-w-[100%]">
              Manage your conversations with students and faculty.
            </p>
          </div>
        </div>
      </div>
      <div className="text-left md:w-[70%] md:flex md:flex-col md:justify-center md:shadow-lg md:px-16 md:mb-16 md:rounded-md md:mt-8 lg:table-cell lg:w-[40vw] pt-6">
        <p className="text-2xl font-bold mt-10 md:text-center">
          Login to your account
        </p>
        <form className=" " onSubmit={handleSubmit}>
          <label className="text-black flex flex-col mt-5">
            <span>
              Email
              <span className="ml-1 text-red-400">*</span>
            </span>
            <div className="relative ">
              <div className="absolute inset-y-0 left-0 top-[10%] flex items-center pl-3 pointer-events-none">
                <MailOutline className="text-[#7E879D]" />
              </div>
              <input
                className="bg-[#EEF8F7] py-3 px-10 focus:outline-none font-medium text-sm mt-1 rounded-md w-full"
                type="email"
                name="email"
                placeholder="Your Email"
                value= {formData.email}
                onChange={handleChange}
              />
            </div>
          </label>
          <label className="text-black flex flex-col mt-5">
            <span>
              Password
              <span className="ml-1 text-red-400">*</span>
            </span>
            <div className="relative ">
              <div className="absolute inset-y-0 left-0 top-[10%] flex items-center pl-3 pointer-events-none">
                <LockIcon className="text-[#7E879D]" />
              </div>
              <input
                className="bg-[#EEF8F7] py-3 px-10 focus:outline-none font-medium text-sm mt-1 rounded-md w-full"
                type={`${passwordVisible ? "text" : "password"}`}
                name="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 right-0 top-[10%] flex items-center pr-3">
                {passwordVisible ? (
                  <VisibilityOffIcon
                    className="text-[#7E879D] text-base cursor-pointer"
                    onClick={handlePasswordVisibility}
                  />
                ) : (
                  <RemoveRedEyeIcon
                    className="text-[#7E879D] text-base cursor-pointer"
                    onClick={handlePasswordVisibility}
                  />
                )}
              </div>
            </div>
          </label>
          <button
            className={`w-full bg-[#35C082] text-white font-semibold py-3 rounded-md mt-10 lg:mt-8`}
          >
            Login
          </button>
        </form>
        <p className="font-medium text-[#747980] m-auto w-full md:mx-0 text-center mt-12 mb-16 md:mb-8">
          Don&apos;t have an account ?{" "}
          <span
            className="text-[#35C082] cursor-pointer"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
