import React from "react";

import { getSellableProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import Projects from "../templates/_components/Projects";

const Page = async () => {
  const sellableProjects = await getSellableProjects();

  if (!sellableProjects.data) {
    return <NotFound></NotFound>;
  }
  return (
    <div className=" flex flex-col gap-6 relative">
      <div className=" flex justify-between items-center">
        <div className=" flex flex-col items-start">
          <h1 className=" text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Shop
          </h1>
          <p className=" text-base font-normal dark:text-secondary">
            you can buy Presentations
          </p>
        </div>
      </div>
      {sellableProjects.data.length > 0 ? (
        <Projects projects={sellableProjects.data}></Projects>
      ) : (
        <NotFound></NotFound>
      )}
    </div>
  );
};

export default Page;
