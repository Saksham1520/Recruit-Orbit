import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const fullNameElement = useRef();
  const emailElement = useRef();
  const phoneNumberElement = useRef();
  const passwordElement = useRef();
  const profileElement = useRef();
  const studentElement = useRef();
  const recruiterElement = useRef();

  const navigate = useNavigate();

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const selectedRole =
      (studentElement.current.checked && studentElement.current.value) ||
      (recruiterElement.current.checked && recruiterElement.current.value);

    const formData = new FormData();
    formData.append("fullName", fullNameElement.current.value);
    formData.append("email", emailElement.current.value);
    formData.append("phoneNumber", phoneNumberElement.current.value);
    formData.append("password", passwordElement.current.value);
    formData.append("role", selectedRole);
    if (profileElement.current.files[0]) {
      formData.append("file", profileElement.current.files[0]);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center m-auto max-w-7xl ">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Sign up</h1>
        <div className="my-2">
          <Label>Enter your fullname</Label>
          <Input
            type="text"
            placeholder="Your fullname"
            ref={fullNameElement}
          ></Input>
        </div>
        <div className="my-2">
          <Label>Enter your email</Label>
          <Input
            type="email"
            placeholder="Your email"
            ref={emailElement}
          ></Input>
        </div>
        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            type="number"
            placeholder="Your phone number"
            ref={phoneNumberElement}
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
                className="cursor-pointer"
                ref={studentElement}
              ></Input>
              <Label htmlFor="option-one">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"
                ref={recruiterElement}
              ></Input>
              <Label htmlFor="option-two">Recruiter</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer"
              ref={profileElement}
            ></Input>
          </div>
        </div>
        {loading ? (
          <Button className="w-full my-4">
            {" "}
            <Loader2 className="animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Signup
          </Button>
        )}

        <span>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 ">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;
