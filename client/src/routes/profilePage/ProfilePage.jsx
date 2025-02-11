import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import React, { Suspense, useContext } from "react";
import "./profilepage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const data = useLoaderData();
  //! hook used to take data from loader js

  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await apiRequest.post("/user/logout");

      updateUser(null);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(currentUser);
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/updateprofile">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "noavatar.png"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.user.name}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.user.email}</b>
            </span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
