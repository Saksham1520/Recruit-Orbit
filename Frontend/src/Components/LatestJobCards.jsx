import React from "react";
import { Badge } from "./ui/badge";

function LatestJobCards({ jobs }) {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:scale-105 duration-200 ">
      <div>
        <h1 className="font-medium text-lg">{jobs?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{jobs?.title}</h1>
        <p className="text-sm text-gray-600">{jobs?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {jobs?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {jobs?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {jobs?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
