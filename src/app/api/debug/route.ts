import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  const entries = await redis.lrange('guestbook', 0, -1);
  console.log('Raw Redis entries:', entries);
  return NextResponse.json(entries);
}
