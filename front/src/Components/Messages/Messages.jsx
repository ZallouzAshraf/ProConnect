import React from "react";
import "./Messages.css";
import Input from "../Input/Input";
import Setting from "../Setting/Setting";

export default function Messages() {
  return (
    <div className="flex">
      <Setting />
      <div className="w-25 h-screen bg-secondary overflow-scroll">
        <div className="flex items-center my-8 mx-14">
          <div>
            <img
              width={75}
              height={75}
              alt=""
              className="border border-primary p-4 rounded-full"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">Ashraf Zallouz</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr className="mx-14 mt-10" />
        <div className="mx-14 mt-10">
          <div className="text-primary text-lg">Messages</div>
          <div>
            <div className="text-center text-lg font-semibold mt-24">
              No Conversations
            </div>
          </div>
        </div>
      </div>

      <div className="w-50 h-screen bg-white flex flex-col items-center">
        <div className="w-3/4 bg-secondary h-80 my-14 rounded-full flex items-center px-14 py-4">
          <div className="cursor-pointer"></div>
          <div className="ml-6 mr-auto">
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
        <div className="msg-box">
          <div className="p-4">
            <div className="text-center text-lg font-semibold mt-24">
              No Messages or No Conversation Selected
            </div>
          </div>
        </div>
        <div className="p-4 w-full flex items-center">
          <Input
            placeholder="Type a message..."
            className="w-3/4"
            inputClassName="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
          />
          <div
            className={`ml-4 p-2 cursor-pointer bg-light rounded-full  && "pointer-events-none"
            }`}
          >
            <button>Envoyer</button>
          </div>
          <div
            className={`ml-4 p-2 cursor-pointer bg-light rounded-full && "pointer-events-none"
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
      </div>
    </div>
  );
}
