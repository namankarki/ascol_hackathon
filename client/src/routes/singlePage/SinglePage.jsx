import { useContext, useState } from "react";
import "./singlepage.scss";
import Slider from "./../../components/slider/Slider";
import DOMPurify from "dompurify";
import Map from "./../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "./../../lib/apiRequest";
import { AuthContext } from "./../../context/AuthContext";
import PopupBooking from "../../components/popup/PopupBooking";

export const SinglePage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="user photo" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Details</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Parking insurance</p>
                ) : (
                  <p>Park at your own risk.</p>
                )}
              </div>
            </div>
            {/* //!sizes */}
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="/twoWheeler.png" alt="" />
              <span>{post.bedroom} Left</span>
            </div>
            <div className="size">
              <img src="/fourWheeler.png" alt="" />
              <span>{post.bathroom} Left </span>
            </div>
          </div>
          {/* <p className="title">Nearby Places</p> */}

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
            {/* <MapComponent enableRouting={true} destination={[post]} /> */}
          </div>
          <div className="buttons">
            {/* //!popup  */}
            <button onClick={openPopup} className="open-popup-btn">
              <img src="/booking.png" alt="" />
              Book your Space
            </button>
            <PopupBooking
              isOpen={isPopupOpen}
              onClose={closePopup}
              image={post.images[0]}
              name={post.user.username}
              post={post}
            />
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
