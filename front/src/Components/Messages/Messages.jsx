import React, { useEffect, useRef, useState } from "react";
import "./Messages.css";
import { io } from "socket.io-client";
import Input from "../Input/Input";
import Setting from "../Setting/Setting";

export default function Messages() {
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const authToken = localStorage.getItem("auth-token");
  const [userData, setuserData] = useState({});
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.messages]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userId");
    const fetchConversations = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/conversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUser }),
        });
        if (!res.ok) {
          throw new Error("Failed to fetch conversations");
        }
        const resData = await res.json();
        setConversations(resData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:4000/api/users/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setUsers(resData);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, receiver) => {
    const res = await fetch(
      `http://localhost:4000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    setMessages({ messages: resData, receiver, conversationId });
  };

  const getUserinfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setuserData(userData);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    getUserinfo();
  }, []);

  const sendMessage = async (e) => {
    setMessage("");
    socket?.emit("sendMessage", {
      senderId: user.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
    });
    const res = await fetch(`http://localhost:4000/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
  };
  useEffect(() => {
    socket?.emit("addUser", user);
    socket?.on("getUsers", (users) => {
      console.log("activeUsers :>> ", users);
    });
    socket?.on("getMessage", (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    });
  }, [socket]);
  return (
    <div className="flex">
      <Setting />
      <div className="w-25 h-screen bg-secondary overflow-scroll">
        <div className="flex items-center my-8 mx-14">
          <div>
            <img
              src={userData.image}
              width={75}
              height={75}
              className="border border-primary p-4 rounded-full"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">
              {userData?.prenom} {userData?.nom}
            </h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr className="mx-14 mt-10" />
        <div className="mx-14 mt-10">
          <div className="text-primary text-lg">Messages</div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(({ conversationId, user }) => (
                <div
                  key={conversationId}
                  className="flex items-center py-8 border-b border-b-gray-300"
                >
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={() => fetchMessages(conversationId, user)}
                  >
                    <div>
                      <img
                        src={user.image}
                        className="w-60 h-60 rounded-full p-4 border border-primary"
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">
                        {user?.prenom} {user?.nom}
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Conversations
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-50 h-screen bg-white flex flex-col items-center">
        {messages?.receiver?.email && (
          <div className="w-3/4 bg-secondary h-80 my-14 rounded-full flex items-center px-14 py-4">
            <div className="cursor-pointer">
              <img src={messages?.receiver?.image} className="imgdiscu" />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg">
                {messages?.receiver?.prenom} {messages?.receiver?.nom}
              </h3>
              <p className="text-sm font-light text-gray-600"></p>
            </div>
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <line x1="15" y1="9" x2="20" y2="4" />
                <polyline points="16 4 20 4 20 8" />
              </svg>
            </div>
          </div>
        )}
        <div className="msg-box">
          <div className="p-4">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }, index) => (
                <div
                  key={index}
                  className={`messageclass ${
                    id === user ? "class1" : "class2"
                  }`}
                >
                  {message}
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Messages or No Conversation Selected
              </div>
            )}
          </div>
        </div>
        {messages?.receiver?.nom && (
          <div className="p-4 w-full flex items-center">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-3/4"
              inputClassName="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
            />
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <button>Envoyer</button>
            </div>
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
