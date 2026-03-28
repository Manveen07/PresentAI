"use server";

import { onAuthenticateUser } from "./user";
import { client } from "@/lib/prisma";
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }
    const projects = await client.project.findMany({
      where: { userId: checkUser.user.id, isDeleted: false },
      orderBy: { updatedAt: "desc" },
    });
    if (projects.length === 0) {
      return { status: 404, error: "No Projects Found" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.log("⚠️Error", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }
    const projects = await client.project.findMany({
      where: { userId: checkUser.user.id, isDeleted: false },
      orderBy: { updatedAt: "desc" },
      take: 5,
    });
    if (projects.length === 0) {
      return { status: 404, error: "No Projects Found" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.log("⚠️Error", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const recoverproject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }
    const project = await client.project.update({
      where: { id: projectId },
      data: { isDeleted: false },
    });
    if (!project) {
      return { status: 404, error: "Failed to recover project" };
    }
    return { status: 200, data: project };
  } catch (error) {
    console.log("⚠️Error", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }
    const project = await client.project.update({
      where: { id: projectId },
      data: { isDeleted: true },
    });
    if (!project) {
      return { status: 404, error: "Failed to delete project" };
    }
    return { status: 200, data: project };
  } catch (error) {
    console.log("⚠️Error", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0) {
      return { status: 400, error: "Title and outlines are required." };
    }
    const allOutlines = outlines.map((outline) => outline.title);

    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }
    const project = await client.project.create({
      data: {
        title,
        outlines: allOutlines,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: checkUser.user.id,
      },
    });

    if (!project) {
      return { status: 500, error: "Failed to create project" };
    }
    return { status: 200, data: project };
  } catch (error) {
    console.log("⚠️Error", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }
    const project = await client.project.findFirst({
      where: { id: projectId },
    });
    const isOwned = project?.userId === checkUser.user.id;
    if (!project) {
      return { status: 404, error: "Project not found" };
    }
    return { status: 200, data: { ...project, isOwned: isOwned } };
  } catch (error) {
    console.log("⚠️Error", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateSlides = async (projectId: string, slides: JsonValue) => {
  try {
    if (!projectId || !slides) {
      return { status: 400, error: "Invalid Request" };
    }
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides,
      },
    });
    if (!updatedProject) {
      return { status: 500, error: "Failed to Update Project" };
    }
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("⚠️Error", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateTheme = async (projectId: string, theme: string) => {
  try {
    if (!projectId || !theme) {
      return { status: 400, error: "Invalid Request" };
    }

    const updateProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        themeName: theme,
      },
    });
    if (!updateProject) {
      return { status: 500, error: "Failed to Update Theme" };
    }
    return { status: 200, data: updateProject };
  } catch (error) {
    console.error("🛑 ️ Error in updateTheme:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteAllProjects = async (projectIds: string[]) => {
  try {
    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      return { status: 400, error: "Invalid Request" };
    }
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }
    const userId = checkUser.user.id;

    const ProjectsToDelete = await client.project.findMany({
      where: {
        id: {
          in: projectIds,
        },
        userId: userId,
      },
    });
    if (ProjectsToDelete.length === 0) {
      return { status: 404, error: "No Projects Found" };
    }

    const deleteProjects = await client.project.deleteMany({
      where: {
        id: {
          in: ProjectsToDelete.map((project) => project.id),
        },
      },
    });
    return {
      status: 200,
      message: `${deleteProjects.count} Projects Deleted}`,
    };
  } catch (error) {
    console.error("🛑 ️ Error in deleteAllProjects:", error);
  }
};

export const getDeleteProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (projects.length === 0) {
      return { status: 404, error: "No Deleted Projects Found" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.error("🛑 ️ Error in getDeleteProjects:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateProjectVariantId = async (
  variantId: string,
  projectId: string
) => {
  const checkUser = await onAuthenticateUser();
  if (checkUser.status !== 200 || !checkUser.user) {
    return { status: 403, error: "User Not Authenticated" };
  }
  try {
    const project = await client.project.findUnique({
      where: { id: projectId },
    });

    const isOwned = project?.userId === checkUser.user.id;

    if (!project) {
      return { status: 404, error: "Project not found" };
    }

    if (project.isDeleted) {
      return { status: 400, error: "Project is deleted" };
    }
    const updatedProject = await client.project.update({
      where: { id: projectId },
      data: { variantId, isSellable: true },
    });
    return { status: 200, data: updatedProject, isOwned };
  } catch (error) {
    console.error("🛑 ️ Error in updateProjectVariantId:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getSellableProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }
    const projects = await client.project.findMany({
      where: {
        // userId: checkUser.user.id,
        isDeleted: false,
        isSellable: true,
        NOT: {
          userId: checkUser.user.id, // exclude user's own projects
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (projects.length === 0) {
      return { status: 404, error: "No Sellable Projects Found" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.error("🛑 ️ Error in getSellableProjects:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};
