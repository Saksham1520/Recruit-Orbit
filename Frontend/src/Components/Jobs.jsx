import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

function Jobs() {
  const { allJobs } = useSelector((store) => store.job);
  const [radioFilterJob, setRadioFilterJob] = useState([]);
  const { radioFilter } = useSelector((store) => store.job);

  useEffect(() => {
    const radioFilteredJob =
      allJobs.length > 0 &&
      allJobs.filter((job) => {
        if (!radioFilter) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(radioFilter.toLowerCase()) ||
          job?.location?.toLowerCase().includes(radioFilter.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(radioFilter.toLowerCase()) ||
          job?.jobType?.toLowerCase().includes(radioFilter.toLowerCase())
        );
      });
    setRadioFilterJob(radioFilteredJob);
  }, [allJobs, radioFilter]);

  return (
    <div className="max-w-7xl mx-auto mt-5 px-4">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[20%]">
          <FilterCard />
        </div>

        {radioFilterJob.length > 0 ? (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {radioFilterJob.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <span>Jobs not found.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
