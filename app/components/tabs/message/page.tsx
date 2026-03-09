'use client';

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Phone,
  Mail,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  MessageSquare,
  ArrowLeft
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCurrentUser } from "@/app/components/currentUser";
import { API_BASE_URL } from "@/app/config/api";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MessagesPage = () => {
  const { theme } = useTheme();
  const { token, user, userProfile } = useCurrentUser();
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!token) return;

    const newSocket = io(API_BASE_URL, {
      auth: { token },
    });

    setSocket(newSocket);

    newSocket.on("receive_message", (message) => {
      // Check if the message belongs to the current active chat
      if (activeChat && (message.conversation_id === activeChat.id || message.conversationId === activeChat.id)) {
        setMessages((prev) => [...prev, message]);
      }
      fetchConversations();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token, activeChat]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/chat/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConversations(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
    }
  };

  const fetchMessages = async (conversationId: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/chat/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchConversations();
  }, [token]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChat) return;

    try {
      const receiverId = activeChat.participant?.id;
      if (!receiverId) return;

      const res = await axios.post(
        `${API_BASE_URL}/chat/send`,
        {
          receiverId,
          conversationId: activeChat.id,
          message: messageText,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newMessage = res.data.data;
      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");

      if (socket) {
        socket.emit("send_message", {
          conversationId: activeChat.id,
          senderId: user?.userId,
          content: messageText,
          id: newMessage.id,
          createdAt: newMessage.createdAt,
          user: {
            id: user?.userId,
            first_name: user?.currentUser?.split(' ')[0] || "User",
            last_name: user?.currentUser?.split(' ')[1] || "",
            Profile: { avatar: userProfile?.avatar }
          }
        });
      }

      fetchConversations();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className={`flex h-[calc(100vh-120px)] rounded-3xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'border-white/10 bg-black/20' : 'border-gray-100 bg-white'}`}>
      {/* SIDEBAR: CONVERSATIONS */}
      <div className={`${showChat ? "hidden md:flex" : "flex"} w-full md:w-80 lg:w-96 flex-col border-r ${theme === 'dark' ? 'border-white/10' : 'border-gray-100'}`}>
        <div className="p-6 border-b border-gray-100 dark:border-white/10">
          <h2 className="text-2xl font-black mb-4">Messages 💬</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-transparent'
                }`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations.length === 0 ? (
            <div className="p-10 text-center opacity-50">
              <MessageSquare className="w-12 h-12 mx-auto mb-4" />
              <p>No conversations yet</p>
            </div>
          ) : (
            conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChat(chat);
                  fetchMessages(chat.id);
                  setShowChat(true); // Show chat on mobile
                  if (socket) {
                    socket.emit("join_chat", chat.id);
                  }
                }}
                className={`flex items-center space-x-4 p-4 cursor-pointer transition-all duration-300 border-b border-gray-50 dark:border-white/5 ${activeChat?.id === chat.id
                  ? "bg-green-600/10 border-l-4 border-l-green-600"
                  : `${theme === 'dark' ? "hover:bg-white/5" : "hover:bg-gray-50"}`
                  }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500/20">
                    <img
                      src={chat.participant?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s"}
                      className="w-full h-full object-cover"
                      alt={chat.participant?.name}
                    />
                  </div>
                  {chat.participant?.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-black rounded-full text-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold truncate text-sm">{chat.participant?.name || "User"}</h3>
                    <span className="text-[10px] opacity-50">
                      {chat.lastMessage?.createdAt ? dayjs(chat.lastMessage.createdAt).fromNow() : ""}
                    </span>
                  </div>
                  <p className="text-xs truncate opacity-60">
                    {chat.lastMessage?.content || chat.lastMessage?.message || "Start a conversation"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className={`${!showChat ? "hidden md:flex" : "flex"} flex-1 flex flex-col relative`}>
        {activeChat ? (
          <>
            {/* CHAT HEADER */}
            <div className={`p-4 border-b flex items-center justify-between z-10 ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-gray-100 bg-white/80'} backdrop-blur-md`}>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowChat(false)}
                  className="md:hidden p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-green-500/20">
                  <img
                    src={activeChat.participant?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s"}
                    className="w-full h-full object-cover"
                    alt={activeChat.participant?.name}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{activeChat.participant?.name}</h3>
                  <p className="text-[10px] text-green-500 font-medium">
                    {activeChat.participant?.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                  <Phone className="w-4 h-4 opacity-70" />
                </button>
                <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                  <MoreVertical className="w-4 h-4 opacity-70" />
                </button>
              </div>
            </div>

            {/* MESSAGES */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar ${theme === 'dark' ? 'bg-black/10' : 'bg-gray-50/30'}`}>
              {loading ? (
                <div className="flex items-center justify-center h-full opacity-50 text-sm">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full opacity-50 text-sm">No messages yet. Say hi! 👋</div>
              ) : (
                messages.map((msg, idx) => {
                  const isMe = msg.senderId === user?.userId || msg.sender_id === user?.userId;
                  return (
                    <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start animate-in fade-in slide-in-from-left-4 duration-300"}`}>
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${isMe
                        ? "bg-green-600 text-white rounded-tr-none shadow-green-600/10"
                        : `${theme === 'dark' ? 'bg-white/10' : 'bg-white'} rounded-tl-none`
                        }`}>
                        <p className="leading-relaxed">{msg.content || msg.message}</p>
                        <span className={`text-[9px] mt-1 block opacity-50 text-right`}>
                          {dayjs(msg.createdAt || new Date()).format('HH:mm')}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT AREA */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-gray-100 bg-white'}`}>
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button type="button" className={`p-2.5 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'} opacity-60`}>
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className={`w-full py-3 px-5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-transparent'
                      }`}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="p-3.5 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:scale-100 hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-40">
            <div className="w-24 h-24 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Your Messenger</h3>
            <p className="max-w-xs text-sm">Select a conversation from the sidebar to start chatting with other farmers.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
