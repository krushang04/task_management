describe("Task Service", () => {
  test("should fetch tasks from API", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, title: "Task 1", completed: false }]),
      })
    );

    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();

    expect(data).toHaveLength(1);
  });

  // Add more tests...
});
