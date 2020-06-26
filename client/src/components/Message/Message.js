import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";

export default function Message({ message: { text, user }, name }) {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) isSentByCurrentUser = true;
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">
        {trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1)}
      </p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">
        {user !== "admin" ? user.charAt(0).toUpperCase() + user.slice(1) : null}
      </p>
    </div>
  );
}
