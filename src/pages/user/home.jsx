// CSS Imports
import "./home.css";
// JSX Imports
import { GameCarousel } from "../../components/games/gameList";
import { HamburgerMenu } from "../../components/navbar/navbar";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../data/auth";
import { useEffect, useRef, useState } from "react";

// Exports

export const Home = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedInUser, setLoggedInUser]= useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    getUserProfile().then(setLoggedInUser);
  }, []);

  useEffect(() => {
    const fetchProfile = userId ? getUserById(userId) : getUserProfile();
    fetchProfile.then((user) => {
      setCurrentUser(user);
    });
  }, [userId]);

  return (
    <>
      <HamburgerMenu />
      <div className="carousel-container">
        <GameCarousel />
      </div>
    </>
  );
};
