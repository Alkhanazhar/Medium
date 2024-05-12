import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupValidation } from "@azhar_india_96/validations";
import axios from "axios";
import { backEndUrl } from "../constants/constants";
import Loading from "./Loading";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [loading, setLoading] = useState(false);
  const [postDetails, setPostDetails] = useState<SignupValidation>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  async function handleSubmit() {
    try {
      console.log(postDetails);
      setLoading(true);
      const { data } = await axios.post(
        `${backEndUrl}/users/${type ? "signup" : "signin"}`,
        postDetails
      );
      const jwt = data.jwt;
      console.log(jwt);
      localStorage.setItem("token", jwt);
      setLoading(false);

      navigate("/blogs");
    } catch (error) {
      console.error(error);
    }
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="font-extrabold text-3xl">
            {" "}
            {type == "signup" ? "Create an account" : "Sign In for account"}
          </div>
          <div className="text-slate-400 font-bold mt-1">
            {type == "signup"
              ? "Already have an account"
              : "Dont have an account"}
            <Link
              className="underline pl-2"
              to={type == "signup" ? "/signin" : "/signup"}
            >
              {type == "signup" ? "login" : "sign up"}
            </Link>
          </div>
          <div className="mt-2">
            {type == "signup" ? (
              <LabelledInput
                label="Name"
                onChange={(e) => {
                  setPostDetails({ ...postDetails, name: e.target.value });
                }}
                placeholder="Enter your Username"
              />
            ) : null}
            <LabelledInput
              label="Email"
              type="email"
              onChange={(e) => {
                setPostDetails({ ...postDetails, email: e.target.value });
              }}
              placeholder="Enter your email address"
            />
            <LabelledInput
              label="Password"
              type="password"
              onChange={(e) => {
                setPostDetails({ ...postDetails, password: e.target.value });
              }}
              placeholder="Enter your Password"
            />
            <button
              type="button"
              className="mt-2 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={handleSubmit}
            >
              {type == "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
interface LabelledInputProps {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputProps) => {
  return (
    <div>
      <div className="mb-5 relative">
        <input
          type={type || "text"}
          id="email"
          className="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
          placeholder={placeholder}
          onChange={onChange}
          autoComplete="off"
        />
        <label className="peer-placeholder-shown:opacity-100 font-bold text-slate-600 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out">
          {label}
        </label>
      </div>
    </div>
  );
};
