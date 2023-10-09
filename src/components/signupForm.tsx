import { useEffect, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { MailOutline } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function LoginForm(){
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);
  const [requirementsMet, setRequirementsMet] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
    length: false,
  });
  
  useEffect(() => {}, [isPasswordFocused]);
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfPasswordVisibility = () => {
    setConfPasswordVisible(!confPasswordVisible);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = event.target;

    if (name === 'phone') {
      value = value.replace(/[^0-9+]/g, '');
    }

    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));

    if (name === 'password' && isPasswordFocused === false) {
      setIsPasswordFocused(true);
    }

    if (name === 'password') {
      const updatedRequirementsMet = {
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialCharacter: /[!@#$%^&*]/.test(value),
        length: value.length >= 8,
      };

      setRequirementsMet(updatedRequirementsMet);
    }
  };

    return(
        <div className="mx-10 md:flex md:items-start md:justify-center md:pl-0 md:w-screen md:mr-0 md:pr-0 lg:table lg:my-16 xl:my-20 lg:w-[85vw] xl:w-[80vw] lg:m-auto">
        <div className="hidden lg:inline lg:bg-[#73d8ab] lg:h-full md:mt-8 lg:table-cell lg:w-[40vw] lg:shadow-lg lg:rounded-md lg:rounded-r-none lg:align-middle lg:text-center">
          <div className="lg:flex lg:items-center lg:justify-center lg:h-[100%] lg:m-auto">
            <div className="lg:bg-[#000000] lg:bg-opacity-10 lg:w-[70%] lg:py-14 lg:px-14">
              <div className="lg:flex lg:justify-center">
                <p className="lg:text-white lg:text-3xl lg:font-bold lg:max-w-[80%] xl:max-w-[60%]">
                  <LocalShippingIcon className="lg:text-white lg:mr-1" />
                  Driving Success Managing <span className="text-[#113c29]">Fleet</span>
                </p>
              </div>
              <p className="lg:mt-6 lg:text-white">
                Gain complete visibility and control over your fleet.
              </p>
            </div>
          </div>
        </div>
        <div className="text-left md:w-[70%] md:flex md:flex-col md:justify-center md:shadow-lg md:px-16 md:mb-16 md:rounded-md md:mt-8 lg:table-cell lg:w-[40vw]">
          <p className="text-2xl font-bold mt-10 md:text-center">Create new account</p>
          <form className=" ">
            <label className="text-black flex flex-col mt-6 md:mt-8">
              <span>
                First Name
                <span className="ml-1 text-red-400">*</span>
              </span>
              <input
                className="bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md"
                type="text"
                name="fName"
                placeholder="Your First Name"
                // value={formData.fName}
                // onChange={handleChange}
              />
            </label>
            <label className="text-black flex flex-col mt-5">
              <span>
                Last Name
                <span className="ml-1 text-red-400">*</span>
              </span>
              <input
                className="bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md"
                type="text"
                name="lName"
                placeholder="Your Last Name"
                // value={formData.lName}
                // onChange={handleChange}
              />
            </label>
            <label className="text-black flex flex-col mt-5">
              <span>
                Phone Number
                <span className="ml-1 text-red-400">*</span>
              </span>
              <input
                className="bg-[#EEF8F7] py-3 px-4 focus:outline-none font-medium text-sm mt-1 rounded-md"
                type="text"
                name="phone"
                placeholder="Your Phone Number"
                // value={formData.phone}
                // onChange={handleChange}
              />
            </label>
            <label className="text-black flex flex-col mt-5">
              <span>
                Email
                <span className="ml-1 text-red-400">*</span>
              </span>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 top-[10%] flex items-center pl-3 pointer-events-none">
                  <MailOutline className="text-[#7E879D] text-[0.1rem]" />
                </div>
                <input
                  className="bg-[#EEF8F7] py-3 px-10 focus:outline-none font-medium text-sm mt-1 rounded-md w-full"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                //   value={formData.email}
                //   onChange={handleChange}
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
                  <LockIcon className="text-[#7E879D] text-base" />
                </div>
                <input
                  className="bg-[#EEF8F7] py-3 px-10 focus:outline-none font-medium text-sm mt-1 rounded-md w-full"
                  type={`${passwordVisible ? 'text' : 'password'}`}
                  name="password"
                  placeholder="Your Password"
                //   value={formData.password}
                //   onChange={handleChange}
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
            <div className={`mt-4 ${!isPasswordFocused && 'hidden'}`}>
              <p className="text-sm">
                {requirementsMet.uppercase ? (
                  <CheckRoundedIcon className="text-[#35C082] mr-1" />
                ) : (
                  <CloseRoundedIcon className="text-[#e74c3c] mr-1" />
                )}
                Should contain an uppercase character
              </p>
              <p className="text-sm">
                {requirementsMet.lowercase ? (
                  <CheckRoundedIcon className="text-[#35C082] mr-1" />
                ) : (
                  <CloseRoundedIcon className="text-[#e74c3c] mr-1" />
                )}
                Should contain a lowercase character
              </p>
              <p className="text-sm">
                {requirementsMet.number ? (
                  <CheckRoundedIcon className="text-[#35C082] mr-1" />
                ) : (
                  <CloseRoundedIcon className="text-[#e74c3c] mr-1" />
                )}
                Should contain at least one number
              </p>
              <p className="text-sm">
                {requirementsMet.specialCharacter ? (
                  <CheckRoundedIcon className="text-[#35C082] mr-1" />
                ) : (
                  <CloseRoundedIcon className="text-[#e74c3c] mr-1" />
                )}
                Should contain a special character
              </p>
              <p className="text-sm">
                {requirementsMet.length ? (
                  <CheckRoundedIcon className="text-[#35C082] mr-1" />
                ) : (
                  <CloseRoundedIcon className="text-[#e74c3c] mr-1" />
                )}
                Should be at least 8 characters long
              </p>
            </div>
            <label className="text-black flex flex-col mt-5">
              <span>
                Confirm Password
                <span className="ml-1 text-red-400">*</span>
              </span>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 top-[10%] flex items-center pl-3 pointer-events-none">
                  <LockIcon className="text-[#7E879D] text-base" />
                </div>
                <input
                  className="bg-[#EEF8F7] py-3 px-10 focus:outline-none font-medium text-sm mt-1 rounded-md w-full"
                  type={`${confPasswordVisible ? 'text' : 'password'}`}
                  name="confirmPassword"
                  placeholder="Your Password"
                //   value={formData.confirmPassword}
                //   onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 top-[10%] flex items-center pr-3">
                  {confPasswordVisible ? (
                    <VisibilityOffIcon
                      className="text-[#7E879D] text-base cursor-pointer"
                      onClick={handleConfPasswordVisibility}
                    />
                  ) : (
                    <RemoveRedEyeIcon
                      className="text-[#7E879D] text-base cursor-pointer"
                      onClick={handleConfPasswordVisibility}
                    />
                  )}
                </div>
              </div>
            </label>
            <p className="mt-10 font-medium text-[#747980]">
              By signing up you agree to our <span className="text-[#35C082]">Terms & Condition</span>{' '}
              and <span className="text-[#35C082]">Privacy Policy.</span>
            </p>
            <button
              className={`w-full bg-[#35C082] text-white font-semibold py-3 rounded-md mt-16 lg:mt-8`}
            >
              Sign up
            </button>
          </form>
          {/* <div className="flex items-center justify-between my-6">
              <hr className="border-t border-[#747980] w-[40%]" />
              <p className="text-[#747980] font-semibold">or</p>
              <hr className="border-t border-[#747980] w-[40%]" />
              </div>
              <GoogleBtn width="250" />  */}
          <p className="font-medium text-[#747980] m-auto w-full md:mx-0 text-center mt-12 mb-16 md:mb-8">
            Already signed up ?{' '}
            <span
              className="text-[#35C082] cursor-pointer"
              onClick={() => {
                // navigate('/login');
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    );
}