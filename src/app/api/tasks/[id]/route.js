import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';
import { getUser } from '@/lib/getUser';

export async function PUT(req, { params }) {
  try {
    // Next.js 15 route parameters must be awaited
    const { id } = await params;

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, stage } = await req.json();

    await connectDB();

    // Find task and verify ownership
    const task = await Task.findOne({ _id: id, userId: user._id });
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update values if passed
    if (title !== undefined) {
      if (!title.trim()) {
        return NextResponse.json(
          { error: 'Title cannot be empty' },
          { status: 400 }
        );
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (stage !== undefined) {
      const validStages = ['Todo', 'In Progress', 'Done'];
      if (!validStages.includes(stage)) {
        return NextResponse.json(
          { error: 'Invalid task stage' },
          { status: 400 }
        );
      }
      task.stage = stage;
    }

    await task.save();

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error('Update task API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    // Next.js 15 route parameters must be awaited
    const { id } = await params;

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Find and delete task (verifying ownership)
    const task = await Task.findOneAndDelete({ _id: id, userId: user._id });
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete task API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
