import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const style = "bg-blue-500 p-5 w-1/2 text-center border rounded-md text-white font-bold text-3xl"
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-10vh)] space-y-7">
        <Link to={"/report-lost-nic"} className={style}>Report lost NIC</Link>
        <Link to={"/my-complaints"} className={style}>My Compalints</Link>
        <Link to={"/complaints-summary"} className={style}>Complaints Summary Report</Link>
        <Link to={"/stations_assigning"} className={style}>Station Assigning</Link>
        <Link to={"/station_dashboard"} className={style}>Station Dashboard</Link>
      </div>
    </>
  );    
};

export default HomePage;
