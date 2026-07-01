// CSS Imports
import "./home.css"


// JSX Imports
import { GameCarousel } from "../../components/games/gameList";
import { HamburgerMenu } from "../../components/navbar/navbar";

// Exports

export const Home = () => {
  return (
    <>
      <HamburgerMenu />
      <div className="carousel-container">
        <GameCarousel />
      </div>
    </>
  );
};
