describe("Drag and Drop Functionality", () => {
  test("should reorder tasks on drag and drop", () => {
    const tasks = [
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
      { id: 3, title: "Task 3" },
    ];

    const draggedIndex = 0;
    const dropIndex = 2;

    const newTasks = [...tasks];
    const draggedTask = newTasks[draggedIndex];
    newTasks.splice(draggedIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);

    expect(newTasks[2].id).toBe(1);
  });
});
