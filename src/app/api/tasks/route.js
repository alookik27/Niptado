import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';
import { getUser } from '@/lib/getUser';

export async function GET(req) {
  try {
    // Authenticate the user from HTTP-only cookie
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const stage = searchParams.get('stage');

    // Build user-specific query
    const query = { userId: user._id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (stage) {
      query.stage = stage;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Fetch tasks API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Authenticate the user from HTTP-only cookie
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, stage } = await req.json();

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Validate stage if provided
    const validStages = ['Todo', 'In Progress', 'Done'];
    if (stage && !validStages.includes(stage)) {
      return NextResponse.json(
        { error: 'Invalid task stage' },
        { status: 400 }
      );
    }

    await connectDB();

    const newTask = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      stage: stage || 'Todo',
      userId: user._id,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Create task API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
