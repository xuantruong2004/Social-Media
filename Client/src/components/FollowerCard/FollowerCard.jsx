import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";
import "./FollowerCard.css";
import FollowerItem from "./FollowerItem/FollowerItem";

function FollowerCard(props) {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data.filter((person) => person._id !== user._id)); //get person not userId current
    };
    fetchPersons();
  }, []);
  return (
    <div className="FollowerCard">
      <h4>People you may know</h4>

      <div className="FollowerList">
        {persons.map((person, index) => (
          <FollowerItem key={person._id} person={person} />
        ))}
      </div>
      <div className="seeMore">
        <span>See more</span>
      </div>
    </div>
  );
}

export default FollowerCard;
