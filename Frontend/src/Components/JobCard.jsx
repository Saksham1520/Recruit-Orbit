import { Bookmark } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-md shadow-lg hover:scale-105 duration-200">
      <div className="flex justify-between">
        <h1 className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </h1>
        <Bookmark></Bookmark>
      </div>
      <div className="flex gap-4 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex gap-4 mt-4 flex-wrap">
        {job?.requirements?.map((skill) => (
          <Badge
            className={"text-green-700 border border-black"}
            variant="ghost"
          >
            {skill}
          </Badge>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => navigate(`/jobdescription/${job?._id}`)}
          variant="outline"
          className={"text-black"}
        >
          Details
        </Button>
        <Button variant="outline" className="text-white bg-green-500">
          Save for later
        </Button>
      </div>
    </div>
  );
}

export default JobCard;
