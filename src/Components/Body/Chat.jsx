import React, { useEffect, useState, useContext } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { URL } from '../../Constants';
import AuthContext from '../Contexts/AuthContext';

const Chat = () => {
  const authContext = useContext(AuthContext)
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        const response = await fetch(URL + `/api/v1/chat/messages`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authContext.token}`
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch chat history");
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
  
    fetchPreviousMessages();

    const socket = new SockJS(URL + '/chat-websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${authContext.token}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {

        client.subscribe('/topic/messages', (message) => {
          const msg = JSON.parse(message.body);
          setMessages((prev) => [...prev, msg]);
        });

        client.subscribe('/topic/typing', (typingMsg) => {
          const msg = JSON.parse(typingMsg.body);
          setTyping(msg.type === 'TYPING');
          setTimeout(() => setTyping(false), 1500);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      }
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !stompClient || !stompClient.connected) return;

    const chatMessage = {
      userName: authContext.user,
      userId: authContext.userId,
      content: input,
      timestamp: new Date().toISOString(),
      type: 'CHAT'
    };
    stompClient.publish({
      destination: '/app/chat/send',
      body: JSON.stringify(chatMessage)
    });
    setInput('');
  };

  const sendTyping = () => {
    if (!stompClient || !stompClient.connected || isTyping) return;

    setIsTyping(true);
    stompClient.publish({
      destination: '/app/chat/typing',
      body: JSON.stringify({ type: 'TYPING' })
    });
    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col" style={{ height: '550px' }}>
      <div className="text-center text-2xl font-semibold mb-4 text-gray-800">
        Chat Room
      </div>

      <div className="flex-1 overflow-y-auto bg-white border rounded-lg shadow p-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <div className="inline-block bg-gray-100 rounded-lg px-4 py-2">
              <strong className="text-blue-600">{msg.userName}</strong>: {msg.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="mt-2">
            <div className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
              Someone is typing...
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            sendTyping();
          }}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="border rounded-full p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>

  );
};

export default Chat;
