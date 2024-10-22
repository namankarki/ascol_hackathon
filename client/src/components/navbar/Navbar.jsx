import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "./../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) {
    fetch();
  }

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>गतिSunya</span>
        </a>
        <a href="/">Home</a>
        <Link to="/list">
          {" "}
          <a href="/">List</a>
        </Link>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.png"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}

              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">
              <a>Sign in</a>
            </Link>
            <Link to="/register">
              <a className="register">Register</a>
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <Link to="/list">
            <span>List</span>
          </Link>
          <Link to="/register">
            <span>Register</span>
          </Link>
          <Link to="/login">
            <a>SignIn</a>
          </Link>
          <Link to="/profile">
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
