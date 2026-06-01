import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  stage: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done'],
    default: 'Todo',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User association is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent compiling model multiple times in development hot-reloads
const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
