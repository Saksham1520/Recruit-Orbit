import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const emailElement = useRef();
  const passwordElement = useRef();
  const studentElement = useRef();
  const recruiterElement = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const selectedRole =
      (studentElement.current.checked && studentElement.current.value) ||
      (recruiterElement.current.checked && recruiterElement.current.value);

    const loginInput = {
      email: emailElement.current.value,
      password: passwordElement.current.value,
      role: selectedRole,
    };

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, loginInput, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }

    emailElement.current.value = "";
    passwordElement.current.value = "";
  };

  return (
    <div className="flex items-center justify-center m-auto max-w-7xl ">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Login here</h1>

        <div className="my-2">
          <Label>Enter your email</Label>
          <Input
            type="email"
            placeholder="Your email"
            ref={emailElement}
          ></Input>
        </div>

        <div className="my-2">
          <Label>Password </Label>
          <Input
            type="password"
            placeholder="Your password"
            ref={passwordElement}
          ></Input>
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-6 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                ref={studentElement}
                className="cursor-pointer"
              ></Input>
              <Label htmlFor="option-one">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                ref={recruiterElement}
                className="cursor-pointer"
              ></Input>
              <Label htmlFor="option-two">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className=" animate-spin"></Loader2> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Login
          </Button>
        )}

        <span>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 ">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
