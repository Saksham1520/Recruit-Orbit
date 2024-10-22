import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setRadioFilter } from "@/redux/jobSlice";
import { Button } from "./ui/button";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Job-Type",
    array: ["Full-time", "Part-time"],
  },
  {
    fitlerType: "Company",
    array: ["Google", "Microsoft", "Juspay", "Adobe"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const valueChangeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setRadioFilter(selectedValue));
    console.log(selectedValue);
  }, [selectedValue]);

  const onClickHandler = () => {
    setSelectedValue("");
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <Button onClick={onClickHandler} className="mt-2">
        Clear Filter
      </Button>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={valueChangeHandler}>
        {fitlerData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.fitlerType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
