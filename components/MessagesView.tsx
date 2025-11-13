import React, { useState } from 'react';
import type { User, Conversation } from '../types';
import { MOCK_CONVERSATIONS, MOCK_PRODUCTS, MOCK_USERS } from '../constants';

interface MessagesViewProps {
  currentUser: User;
}

const MessagesView: React.FC<MessagesViewProps> = ({ currentUser }) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(conversations.length > 0 ? conversations[0].id : null);
  const [newMessage, setNewMessage] = useState('');

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId) return;

    const updatedConversations = conversations.map(convo => {
      if (convo.id === selectedConversationId) {
        return {
          ...convo,
          messages: [
            ...convo.messages,
            {
              id: Math.random(),
              senderId: currentUser.id,
              text: newMessage,
              timestamp: "Just now"
            }
          ]
        };
      }
      return convo;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  const getConversationDetails = (convo: Conversation) => {
    const otherParticipantId = convo.participantIds.find(id => id !== currentUser.id);
    const otherParticipant = MOCK_USERS.find(u => u.id === otherParticipantId);
    const product = MOCK_PRODUCTS.find(p => p.id === convo.productId);
    const lastMessage = convo.messages[convo.messages.length - 1];
    return { otherParticipant, product, lastMessage };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-display font-bold text-slate-800 mb-6">Messages</h1>
      <div className="flex flex-col md:flex-row h-[75vh] bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 border-r border-slate-200 overflow-y-auto">
          {conversations.map(convo => {
            const { otherParticipant, product, lastMessage } = getConversationDetails(convo);
            if (!otherParticipant || !product) return null;
            return (
              <button
                key={convo.id}
                onClick={() => setSelectedConversationId(convo.id)}
                className={`w-full text-left p-4 flex items-center space-x-3 hover:bg-slate-50 transition-colors duration-200 border-b border-slate-100 ${selectedConversationId === convo.id ? 'bg-brand-light' : ''}`}
              >
                <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="h-12 w-12 rounded-full" />
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-slate-800 truncate">{otherParticipant.name}</p>
                    <p className="text-xs text-slate-400">{lastMessage.timestamp}</p>
                  </div>
                  <p className="text-sm text-slate-600 truncate">{product.title}</p>
                  <p className="text-sm text-slate-500 truncate">{lastMessage.text}</p>
                </div>
              </button>
            );
          })}
        </div>
        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-slate-50">
          {selectedConversation ? (() => {
            const { otherParticipant, product } = getConversationDetails(selectedConversation);
            if (!otherParticipant || !product) return null;
            return (
              <>
                <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-white">
                  <img src={product.imageUrls[0]} alt={product.title} className="h-12 w-12 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold text-slate-800">{product.title}</h3>
                    <p className="text-sm text-slate-500">
                      Chat with <span className="font-medium text-slate-700">{otherParticipant.name}</span>
                    </p>
                  </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {selectedConversation.messages.map(msg => (
                    <div key={msg.id} className={`flex items-end gap-2 animate-fade-in-up ${msg.senderId === currentUser.id ? 'justify-end' : ''}`} style={{animationDuration: '0.3s'}}>
                      {msg.senderId !== currentUser.id && <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="h-8 w-8 rounded-full" />}
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${msg.senderId === currentUser.id ? 'bg-brand-primary text-white rounded-br-lg' : 'bg-white text-slate-800 rounded-bl-lg'}`}>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-white border-t border-slate-200">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 block w-full border-slate-300 rounded-full shadow-sm focus:ring-brand-primary focus:border-brand-primary transition"
                    />
                    <button type="submit" className="bg-brand-primary text-white p-3 rounded-full hover:bg-sky-600 transition shadow-md hover:shadow-lg transform hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.17 15.17l-1.414-1.414a1 1 0 00-1.414 0L4.172 16H2.5a1 1 0 00-1 1v1.5a1 1 0 001 1h15a1 1 0 001-1V17a1 1 0 00-1-1h-1.672l-2.172-2.172a1 1 0 00-1.414 0l-1.414 1.414a1 1 0 00.17 1.41l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            )
          })() : (
            <div className="flex-1 flex flex-col items-center justify-center text-center bg-slate-50 p-8">
              <div className="max-w-xs">
                <svg className="mx-auto h-16 w-16 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <h2 className="mt-4 text-xl font-display font-bold text-slate-700">Your Messages</h2>
                <p className="mt-2 text-slate-500">Select a conversation from the list to read your messages and reply.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesView;