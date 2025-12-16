import React, { useState } from "react";
import { CheckCircle, Edit2, X, GripVertical, Calendar } from "lucide-react";

const TaskCard = ({ task, index, onEdit, onComplete, onDelete, onDragStart, onDragOver, onDrop, userRole }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    if (userRole === "admin") {
      setIsDragging(true);
      onDragStart(e, index);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    if (userRole === "admin") {
      e.preventDefault();
      onDragOver(e, index);
    }
  };

  const handleDrop = (e) => {
    if (userRole === "admin") {
      e.preventDefault();
      onDrop(e, index);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const canDelete = userRole === "admin";
  const canEdit = userRole === "admin" || task.status !== "Completed";

  return (
    <div
      draggable={userRole === "admin"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition ${userRole === "admin" ? "cursor-move" : "cursor-default"} ${
        isDragging ? "opacity-50" : ""
      } flex flex-col h-full`}
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-3">
          {userRole === "admin" && <GripVertical size={20} className="text-gray-400 flex-shrink-0 mt-1" />}
          <div className="flex justify-between items-start flex-1">
            <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-2 capitalize">{task.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>{task.status}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{task.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar size={16} className="mr-2" />
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>

      <div className="flex gap-2">
        {task.status !== "Completed" && (
          <button
            onClick={() => onComplete(task.id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
          >
            <CheckCircle size={16} />
            Complete
          </button>
        )}
        {canEdit && task.status !== "Completed" && (
          <button
            onClick={() => onEdit(task)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Edit2 size={16} />
            Edit
          </button>
        )}
        {task.status === "Completed" && userRole === "admin" && (
          <button
            onClick={() => onEdit(task)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Edit2 size={16} />
            Edit
          </button>
        )}
        {canDelete && (
          <button onClick={() => onDelete(task.id)} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
