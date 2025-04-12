'use client';
import { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function Example() {
  const { sendMessage, subscribeToEvent, unsubscribeFromEvent, isConnected } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const user = useCurrentUser();

  useEffect(() => {
    if (user) {
      // Subscribe to messages
      subscribeToEvent('message', (data: { userId: string; content: string; }) => {
        setMessages(prev => [...prev, `${data.userId}: ${data.content}`]);
      });

      // Cleanup subscription
      return () => {
        unsubscribeFromEvent('message');
      };
    }
  }, [user, subscribeToEvent, unsubscribeFromEvent]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && user) {
      sendMessage('message', { userId: user.username, content: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <p>Connection Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>
      </div>

      <div className="border rounded-lg p-4 mb-4 h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <p key={index} className="mb-2">
            {msg}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          disabled={!isConnected || !inputMessage.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}