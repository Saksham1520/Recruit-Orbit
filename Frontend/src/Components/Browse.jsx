import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [filterBrowseJob, setFilterBrowseJob] = useState([]);
  useEffect(() => {
    const filteredBrowseJob =
      allJobs.length > 0 &&
      allJobs.filter((job) => {
        if (!searchedQuery) {
          return false;
        }
        return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase());
      });
    setFilterBrowseJob(filteredBrowseJob || []);
    // dispatch(setSearchedQuery(""));
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filterBrowseJob.length})
        </h1>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {filterBrowseJob.length > 0 ? (
            filterBrowseJob.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p>No jobs found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
