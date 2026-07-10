import { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../data/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faHouse,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// This should be able to be ported into various pages that have the go back button
export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("is_admin");
    setIsOpen(false);
    navigate("/login");
  };

  const handleNav = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="navButtons">
      <div className="navbar-top">
        <div className="hamburger-wrapper">
          <button
            className={`hamburger-btn ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon
              icon={isOpen ? faXmark : faBars}
              style={{ color: "light-dark(#6b6375, #9ca3af)" }}
            />
          </button>
          <span className="navbar-brand">Escape Game Social</span>
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            <button onClick={() => handleNav("/home")}>
              <FontAwesomeIcon
                icon={faHouse}
                style={{ color: "light-dark(#6b6375, #9ca3af)" }}
              />
              <span className="menu-item-text">Home</span>
            </button>
            <button onClick={() => handleNav("/leaderboard")}>
              <FontAwesomeIcon
                icon={faTrophy}
                style={{ color: "light-dark(#6b6375, #9ca3af)" }}
              />
              <span className="menu-item-text">Leaderboard</span>
            </button>
            <hr />
            <button onClick={() => handleNav("/profile")}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "light-dark(#6b6375, #9ca3af)" }}
              />
              <span className="menu-item-text">Profile</span>
            </button>
            {isAdmin && (
              <>
                <hr />
                <button onClick={() => handleNav("/new_game")} style={{ color: "light-dark(#6b6375, #9ca3af)" }}>New Game</button>
                <button onClick={() => handleNav("/edit_game/1")} style={{ color: "light-dark(#6b6375, #9ca3af)" }}>
                  Manage Games
                </button>
              </>
            )}
            <hr />
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
