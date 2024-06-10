import React from "react";
import PropTypes from "prop-types";

const FriendsList = ({ friends, onFriendClick, isOpen }) => {
  return (
    <div
      className={`fixed right-0 top-0 h-full bg-gray-200 p-4 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ transitionDuration: "300ms" }}
    >
      <h2 className="text-xl mb-4">Friends List</h2>
      <ul>
        {friends.map((friend) => (
          <li
            key={friend}
            className="mb-2 p-2 bg-white rounded cursor-pointer hover:bg-gray-300"
            onClick={() => onFriendClick(friend)}
          >
            {friend}
          </li>
        ))}
      </ul>
    </div>
  );
};

FriendsList.propTypes = {
  friends: PropTypes.array.isRequired,
  onFriendClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default FriendsList;
