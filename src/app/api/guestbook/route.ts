import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface GuestbookEntry {
  id: string;
  message: string;
  timestamp: string;
  likes: number;
}

export async function GET() {
  console.log('GET request received');
  let entries = await redis.lrange('guestbook', 0, -1);
  console.log('Raw entries from Redis:', entries);

  const parsedEntries = entries.map((entry) => {
    if (typeof entry === 'string') {
      try {
        return JSON.parse(entry);
      } catch (error) {
        console.error('Error parsing entry:', entry, error);
        return null;
      }
    } else if (typeof entry === 'object' && entry !== null) {
      return entry as GuestbookEntry;
    } else {
      console.error('Unexpected entry format:', entry);
      return null;
    }
  }).filter((entry): entry is GuestbookEntry => entry !== null);

  console.log('Parsed entries:', parsedEntries);

  return NextResponse.json(parsedEntries);
}

export async function POST(request: Request) {
  const { message } = await request.json();
  const entry: GuestbookEntry = {
    id: Date.now().toString(),
    message,
    timestamp: new Date().toISOString(),
    likes: 0,
  };
  await redis.lpush('guestbook', JSON.stringify(entry));
  return NextResponse.json(entry, { status: 201 });
}

export async function PUT(request: Request) {
  const { id } = await request.json();
  const entries = await redis.lrange('guestbook', 0, -1);
  const updatedEntries = entries.map((entry) => {
    let parsedEntry: GuestbookEntry;
    if (typeof entry === 'string') {
      try {
        parsedEntry = JSON.parse(entry);
      } catch (error) {
        console.error('Error parsing entry:', entry, error);
        return entry;
      }
    } else if (typeof entry === 'object' && entry !== null) {
      parsedEntry = entry as GuestbookEntry;
    } else {
      console.error('Unexpected entry format:', entry);
      return entry;
    }

    if (parsedEntry.id === id) {
      parsedEntry.likes += 1;
    }
    return JSON.stringify(parsedEntry);
  });
  await redis.del('guestbook');
  await redis.rpush('guestbook', ...updatedEntries);
  return NextResponse.json({ success: true });
}
