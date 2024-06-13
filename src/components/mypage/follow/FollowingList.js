import React, { useEffect, useState } from "react";
import { FaUsersSlash } from "react-icons/fa";
import privateApi from "../../../api/axios_intercepter";
import FollowingListItem from "./FollowingListItem";

const FollowingList = ({ refreshTrigger }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    fetchFriends();
  }, [refreshTrigger]);

  const fetchFriends = async () => {
    setLoading(true); // Start loading
    try {
      const response = await privateApi.get("/api/friend/list");
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleFriendDeleted = (userId) => {
    setFriends((prevFriends) => prevFriends.filter(friend => friend.userId !== userId));
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  if (friends.length > 0) {
    return (
      <div className="max-h-40rem w-full mt-4 overflow-auto">
        {friends.map(friend => (
          <FollowingListItem
            key={friend.userId}
            friend={friend}
            onFriendDeleted={handleFriendDeleted}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="text-center mt-16">
        <FaUsersSlash className="text-8xl mx-auto" />
        <div className="mt-12">
          <p className="text-3xl font-thin">등록한 친구가 없습니다.</p>
        </div>
      </div>
    );
  }
};

export default FollowingList;
