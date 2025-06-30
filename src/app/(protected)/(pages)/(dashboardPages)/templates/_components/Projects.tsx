"use client";
import { containerVariants } from "@/lib/constant";

import { ProjectCard } from "../../../../../../../src/components/global/projects/ProjectCard";
import { motion } from "framer-motion";
import { Project } from "@prisma/client";

type Props = {
  projects: Project[];
};
const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          projectId={project?.id}
          title={project?.title}
          createdAt={project?.createdAt.toString()}
          isDelete={project?.isDeleted}
          slideData={project?.slides}
          themeName={project.themeName}
          isSellable={project.isSellable}
        ></ProjectCard>
      ))}
    </motion.div>
  );
};

export default Projects;
