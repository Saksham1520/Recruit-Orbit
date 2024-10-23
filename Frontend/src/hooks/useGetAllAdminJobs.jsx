import { setAdminAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllAdminJobs() {
  const dispatch = useDispatch();
  return useEffect(() => {
    const fetchAllAdminjobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAdminAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminjobs();
  }, []);
}

export default useGetAllAdminJobs;
