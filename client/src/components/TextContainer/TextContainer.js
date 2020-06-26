import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import "./TextContainer.css";

export default function TextContainer({ users }) {
  return (
    <div className="textContainer">
      {users ? (
        <>
          <h3>Connected users:</h3>
          <div className="activeContainer">
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <img alt="Online Icon" src={onlineIcon} />
                {name.trim().charAt(0).toUpperCase() +
                  name.trim().toLowerCase().slice(1)}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
