const Task = require("../models/Task");
exports.postTask = async (req, res, next) => {
  const { title, description } = req.body.data;
  // check data is valid
  if (!title || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }
// create new object using the details from frontend
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    // save the data in db
    const savedTask = await newTask.save();
    // response if the data is saved
    res
      .status(201)
      .json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    // response if the validation error
    console.log(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", details: error.errors });
    }
    // response if there is other error
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while creating the task",
    });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    // query to fetch all task
    const tasks = await Task.find();
    // return reponse when data is fetched successfully
    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (err) {
    console.error("Error fetching tasks:", error);
    // return respone if the data is not succesfully fetched
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while fetching tasks",
    });
  }
};

exports.fetchSingleTask = async (req, res, next) => {
  try {
    // id to grab from params/url
    const { id } = req.params;
    if (!id) {
      // check if id is present or not
      return res.status(400).json({ error: "Invalid task ID" });
    }
    // find task associated with id
    const task = await Task.findById(id);

    if (!task) {
      // if no task is found
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({
      // if task is found
      message: "Task retrieved successfully",
      task,
    });
  } catch (err) {
    // if there is error associated with id
    console.error("Error fetching task by ID:", error);

    //if there is error associated server
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while fetching the task",
    });
  }
};

exports.postupdateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // get the new status from the request body
    const { status } = req.body;
    if (!id) {
      // check if id is present or not
      return res.status(400).json({ error: "Invalid task ID" });
    }
    if (!status) {
      // check if id is present or not
      return res.status(400).json({ error: "Invalid task status" });
    }
    // validate the status send from frontend
    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
      });
    }
    // Find the task by ID and update its status
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    // If task is not found
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    // Return the updated task if task is found
    res.status(200).json({
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    console.error("Error updating task status:", err);
    // if unexpected server errors
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while updating the task status",
    });
  }
};
exports.deleteTask = async(req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      // check if id is present or not
      return res.status(400).json({ error: "Invalid task ID" });
    }
    // Find and delete the task by ID
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    // send a success message
    res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (err) {
    console.error("Error deleting task:", err);

    // if unexpected server errors
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while deleting the task",
    });
  }
};
