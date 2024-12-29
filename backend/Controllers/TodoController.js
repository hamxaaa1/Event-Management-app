const TodoModel = require("../Models/todo")





const createTodo = async (req, res) => {
  try {
    const photo = req.file ? req.file.buffer.toString('base64') : null;

    const todoData = {
      ...req.body, 
      photo: photo, 
    };

    const todo = await TodoModel.create(todoData);

    return res.status(201).json({
      message: "Todo Created Successfully!",
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error('Error creating Todo:', error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};


const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({})
    return res.status(200).json({message: "Todos Fetched Successfully!", success: true, data: todos})
  } catch (error) {
    return res.status(500).json({message: "Internal server error!", success: false})
  }
}

const getTodo = async (req, res) => {
  try {
    const {id} = req.params
    const todo = await TodoModel.findById(id)
    if (!todo) {
      return res.status(404).json({message: "Todo not found", success: false})
    }
    return res.status(200).json({message: "Todo Fetched Successfully!", success: true, data: todo})
  } catch (error) {
    return res.status(500).json({message: "Internal server error!", success: false})
  }
}

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if a new photo is uploaded
    const photo = req.file ? req.file.buffer.toString('base64') : null;

    // If there's a new photo, include it in the updated data, otherwise use the existing data.
    const updatedData = {
      ...req.body, 
      photo: photo ? photo : undefined, // If photo is null, don't include it in the update
    };

    // Find and update the Todo
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found", success: false });
    }

    return res.status(200).json({
      message: "Todo Updated Successfully!",
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    console.error('Error updating Todo:', error);
    return res.status(500).json({ message: "Internal server error!", success: false });
  }
};



const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const deletedTodo = await TodoModel.findByIdAndDelete(id)

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found", success: false })
    }

    return res.status(200).json({
      message: "Todo Deleted Successfully!",
      success: true,
      data: deletedTodo  
    })
  } catch (error) {
    console.error(error)  
    return res.status(500).json({ message: "Internal server error!", success: false })
  }
}








module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
} 