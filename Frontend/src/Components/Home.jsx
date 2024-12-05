import React from "react";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";

function Home() {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <HeroSection />
      {user?.role === "student" && <CategoryCarousel />}
      {/* <CategoryCarousel /> */}
      <LatestJobs />
    </>
  );
}

export default Home;
