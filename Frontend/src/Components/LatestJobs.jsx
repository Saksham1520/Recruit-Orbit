import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

function LatestJobs() {
  // const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20  ">
      <h1 className="text-4xl font-bold">
        {" "}
        <span className="text-green-500">Latest & Top</span> Jobs Openings
      </h1>
      <div className="md:grid md:grid-cols-3 md:gap-4 md:my-5 ">
        {allJobs.slice(0, 6).map((jobs) => (
          <LatestJobCards jobs={jobs} key={jobs._id} />
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
