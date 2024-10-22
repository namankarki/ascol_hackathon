import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import apiRequest from "./../../lib/apiRequest";
import UploadWidget from "./../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    //! This line converts the FormData object into a plain JavaScript object. The Object.fromEntries(formData) method takes an iterable of key-value pairs (like the entries in formData) and returns a new object.
    try {
      const res = await apiRequest.post("api/parkingslots", {
        postData: {
          Title: inputs.title,
          price: parseInt(inputs.price),
          location: inputs.location,
          totalSlots: parseInt(inputs.totalSlots),
          availableSlots: parseInt(inputs.availableSlots),
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          Description: value,
          utilities: inputs.utilities,
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Parking</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="Title">Title</label>
              <input id="Title" name="Title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="tel" />
            </div>
            <div className="item">
              <label htmlFor="location">Location</label>
              <input id="location" name="location" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="Description">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>

            <div className="item">
              <label htmlFor="totalSlots">Total slots</label>
              <input
                min={1}
                id="totalSlots"
                name="totalSlots"
                type="totalSlots"
              />
            </div>
            <div className="item">
              <label htmlFor="availableSlots">Available slots</label>
              <input
                min={0}
                id="availableSlots"
                name="availableSlots"
                type="number"
              />
            </div>
            {/* //!for location mapping */}
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            {/* //!mapping */}

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="tenant" defaultChecked>
                  Park at your own risk
                </option>
                <option value="owner">Insurance Covered</option>
              </select>
            </div>

            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <div className="image-container">
          {images.map((image, index) => (
            <img src={image} key={index} />
          ))}
        </div>
        <UploadWidget
          uwConfig={{
            cloudName: "kaustubkarki",
            uploadPreset: "realState",
            multiple: true,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
};

export default NewPostPage;
//2:46:20
