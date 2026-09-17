import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import TaskBoardHeader from "../../components/task/TaskBoardHeader";
import TaskStats from "../../components/task/TaskStats";
import TaskBoardContainer from "../../components/task/TaskBoardContainer";
import EmptyTaskBoard from "../../components/task/EmptyTaskBoard";
import KanbanBoard from "../../components/task/board/KanbanBoard";
import CreateTaskModal from "../../components/task/modal/CreateTaskModal";
import FilterBar from "../../components/task/filters/FilterBar";

import LiveIndicator from "../../components/collaboration/LiveIndicator";

import useTask from "../../hooks/useTask";
import useTaskFilters from "../../hooks/useTaskFilters";

import { filterTasks } from "../../utils/taskFilter";
import { sortTasks } from "../../utils/taskSort";

export default function TaskBoard() {
  const { projectId } = useParams();

  const {
    loading,
    tasks,
    fetchTasks,
  } = useTask();

  const {
    filters,
    updateFilter,
  } = useTaskFilters();

  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("To Do");

  useEffect(() => {
    fetchTasks(projectId);
  }, [projectId]);

  const handleOpenModal = (status = "To Do") => {
    setSelectedStatus(status);
    setOpenModal(true);
  };

  // Apply filters and sorting
  const filteredTasks = sortTasks(
    filterTasks(tasks, filters),
    filters.sort
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <TaskBoardHeader
          onCreateTask={() => handleOpenModal("To Do")}
        />

        <LiveIndicator />
      </div>

      {/* Task Statistics */}
      <TaskStats tasks={tasks} />

      {/* Filters */}
      <FilterBar
        filters={filters}
        updateFilter={updateFilter}
      />

      {/* Kanban Board */}
      <TaskBoardContainer>
        {loading ? (
          <p className="py-10 text-center text-zinc-500">
            Loading Tasks...
          </p>
        ) : (
          <KanbanBoard tasks={filteredTasks} onAddTask={handleOpenModal} />
        )}
      </TaskBoardContainer>

      {/* Create Task Modal */}
      <CreateTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        projectId={projectId}
        initialStatus={selectedStatus}
      />
    </DashboardLayout>
  );
}