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

export async function POST(request: Request) {
  const { id } = await request.json();
  const entries = await redis.lrange('guestbook', 0, -1);
  let updatedEntry: GuestbookEntry | null = null;

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
      updatedEntry = parsedEntry;
    }
    return JSON.stringify(parsedEntry);
  });

  await redis.del('guestbook');
  await redis.rpush('guestbook', ...updatedEntries);

  if (updatedEntry) {
    return NextResponse.json(updatedEntry);
  } else {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }
}
