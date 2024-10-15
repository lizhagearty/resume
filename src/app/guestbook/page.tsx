'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface GuestbookEntry {
  id: string;
  message: string;
  timestamp: string;
  likes: number;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [likedEntries, setLikedEntries] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
    const liked = localStorage.getItem('likedEntries');
    if (liked) {
      setLikedEntries(new Set(JSON.parse(liked)));
    }
  }, []);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching entries...');
      const res = await fetch('/api/debug-redis');
      console.log('Fetch response:', res);
      if (!res.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data = await res.json();
      console.log('Fetched raw data:', data);
      
      // Parse the raw entries
      const parsedEntries = data.rawEntries.map((entry: string | GuestbookEntry) => {
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
      }).filter((entry: GuestbookEntry | null): entry is GuestbookEntry => entry !== null);
      
      console.log('Parsed entries:', parsedEntries);
      setEntries(parsedEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        body: JSON.stringify({ message: newMessage }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error('Failed to add entry');
      }
      const newEntry = await res.json();
      setEntries(prevEntries => [newEntry, ...prevEntries]);
      setNewMessage('');
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const likeEntry = async (id: string) => {
    if (likedEntries.has(id)) return;

    try {
      const res = await fetch('/api/like-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error('Failed to like entry');
      }

      const updatedEntry = await res.json();
      setEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === id ? { ...entry, likes: updatedEntry.likes } : entry
        )
      );

      const newLikedEntries = new Set(Array.from(likedEntries).concat(id));
      setLikedEntries(newLikedEntries);
      localStorage.setItem('likedEntries', JSON.stringify(Array.from(newLikedEntries)));
    } catch (error) {
      console.error('Error liking entry:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">Liz&apos;s Guestbook</h1>
      <form onSubmit={addEntry} className="mb-8">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-4 border-2 border-blue-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Leave me a message <3"
          rows={4}
        />
        <button 
          type="submit" 
          className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Post Message
        </button>
      </form>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : entries.length === 0 ? (
        <p className="text-center text-gray-500 italic">No entries yet. Be the first to leave a message!</p>
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-yellow-100 p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <p className="text-lg mb-2">{entry.message}</p>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>{new Date(entry.timestamp).toLocaleString()}</p>
                <button 
                  onClick={() => likeEntry(entry.id)} 
                  className={`flex items-center space-x-1 ${likedEntries.has(entry.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-600 transition duration-300`}
                  disabled={likedEntries.has(entry.id)}
                >
                  <Heart size={16} fill={likedEntries.has(entry.id) ? 'currentColor' : 'none'} />
                  <span>{entry.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
