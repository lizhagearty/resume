'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import io from 'socket.io-client';

const DrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<any>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const initSocket = async () => {
      try {
        await fetch('/api/socket');
        const newSocket = io();
        setSocket(newSocket);

        newSocket.on('connect', () => {
          console.log('Connected to Socket.IO server');
        });

        newSocket.on('connect_error', (error) => {
          console.error('Socket.IO connection error:', error);
        });

        return () => {
          newSocket.disconnect();
        };
      } catch (error) {
        console.error('Failed to initialize socket:', error);
      }
    };

    initSocket();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    socket.on('draw', (data: any) => {
      console.log('Received draw event:', data);
      drawLine(context, data.x0, data.y0, data.x1, data.y1, data.color);
    });

    return () => {
      socket.off('draw');
    };
  }, [socket]);

  const drawLine = useCallback((context: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, color: string) => {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setLastPosition({ x: offsetX, y: offsetY });
  }, []);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || !socket) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const color = '#000000';

    drawLine(context, lastPosition.x, lastPosition.y, offsetX, offsetY, color);
    socket.emit('draw', { x0: lastPosition.x, y0: lastPosition.y, x1: offsetX, y1: offsetY, color });

    setLastPosition({ x: offsetX, y: offsetY });
  }, [isDrawing, socket, lastPosition, drawLine]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Collaborative Drawing Board</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300 bg-white"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
      />
    </div>
  );
};

export default DrawingBoard;
