const Task = require("../models/taskModel");


exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            status: "succes",
            data: {
                tasks
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                task: newTask
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message 
        });
    }
};


exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                task
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
              task
            }
          });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
          });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
    
        res.status(204).json({
          status: 'success',
          data: null
        });
      } catch (err) {
        res.status(404).json({
          status: 'fail',
          message: err
        });
      }
}
