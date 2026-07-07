import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import ProjectHeader from "../../components/project/ProjectHeader";
import ProjectGrid from "../../components/project/ProjectGrid";
import ProjectList from "../../components/project/ProjectList";
import ProjectToolbar from "../../components/project/ProjectToolbar";
import ProjectStats from "../../components/project/ProjectStats";
import ProjectSkeleton from "../../components/project/ProjectSkeleton";
import EmptyProjects from "../../components/project/EmptyProjects";
import CreateProjectModal from "../../components/project/CreateProjectModal";

import useProject from "../../hooks/useProject";

export default function ProjectsHome() {
  const { workspaceId } = useParams();

  const {
    loading,
    projects,
    fetchProjects,
  } = useProject();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [sort, setSort] =
    useState("name");

  const [view, setView] =
    useState("grid");

  const [createOpen, setCreateOpen] =
  useState(false);

  useEffect(() => {
    fetchProjects(workspaceId);
  }, [workspaceId]);

  const filteredProjects =
    useMemo(() => {
      let data = [...projects];

      if (search) {
        data = data.filter((project) =>
          project.name
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }

      if (status) {
        data = data.filter(
          (project) =>
            project.status === status
        );
      }

      data.sort((a, b) =>
        String(a[sort]).localeCompare(
          String(b[sort])
        )
      );

      return data;
    }, [
      projects,
      search,
      status,
      sort,
    ]);

  return (
    <DashboardLayout>

      <ProjectHeader
        onCreate={() =>
            setCreateOpen(true)
        }
      />

      <ProjectStats
        projects={projects}
      />

      <ProjectToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        view={view}
        setView={setView}
      />

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyProjects />
      ) : view === "grid" ? (
        <ProjectGrid
          projects={filteredProjects}
        />
      ) : (
        <ProjectList
          projects={filteredProjects}
        />
      )}

      <CreateProjectModal
        open={createOpen}
        onClose={() =>
            setCreateOpen(false)
        }
       />
    </DashboardLayout>
  );
}