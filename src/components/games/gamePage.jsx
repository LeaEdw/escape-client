import { useState, useEffect } from "react";
import { getGames, getLeaderboard } from "../../data/games";
import { getUserProfile } from "../../data/auth";
import "./gameList.css";

export const GamePage = () => {
    return (
        <>
        <h1>This will be the game page</h1>
        </>
    )
}

/* The page layout needs to be designed, but will include a form where users can submit theirs ratings for the design, fun and difficulty...
- It would be fun to create a separate styling for each game if that looks ok
*/