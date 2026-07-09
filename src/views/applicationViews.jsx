import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/user/home";
import { NewGameForm } from "../pages/admin/newGame"
import { EditGameFrom } from "../pages/admin/editGame";
import { LeaderBoard } from "../pages/user/leaderboard";
import { UserProfile } from "../pages/user/userProfile"


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localToken = localStorage.getItem("escape_token");

    setCurrentUser(localToken);
  }, []);

  return (
    <>
      <Routes>
        <Route>
          <Route path="/home" element={<Home />} />
           <Route path="/new_game" element={<NewGameForm />} />
           <Route path="/edit_game/:gameId" element={<EditGameFrom />} />
           <Route path="/leaderboard" element={<LeaderBoard />} />
           <Route path="/profile" element={<UserProfile />} />
           <Route path="/users/:userId" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
};