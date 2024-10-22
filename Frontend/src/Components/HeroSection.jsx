import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className=" text-center">
      <div className="flex flex-col my-10 gap-6">
        <span className=" flex flex-col items-center justify-center m-auto px-4 py-2  rounded-full bg-gray-100 ">
          <span>No. 1 Job Hunting Website!! </span>
          <span className="text-red-500 font-bold">
            {" "}
            Where talent meets opportunity
          </span>
        </span>

        <h1 className="font-bold text-5xl">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-green-500">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
          aliquam quae sapiente repudiandae aspernatur.
        </p>
        <div className="w-[40%] flex items-center  border rounded-full shadow-lg border-gray-200 pl-3 mx-auto">
          <input
            type="text"
            placeholder="Find your dream job"
            className="outline-none border-none w-full rounded-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={onChangeHandler} className="rounded-r-full ">
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
