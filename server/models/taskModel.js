const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
name: {
type: String,
unique: true,
required: [true, 'A task must have a name'],
trim: true,
maxlength: [20, 'name can not be more than 20 characters']
},
completed: {
    type: Boolean,
    default: false,
}
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;