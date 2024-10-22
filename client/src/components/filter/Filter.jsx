import "./filter.scss";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("city"));
  //! results shows 2 values kinaki react strictmode use gareko xa

  // const [query, setQuery] = useState({
  //   type: searchParams.get("type") || "",
  //   city: searchParams.get("city") || "",
  //   property: searchParams.get("property") || "",
  //   minPrice: searchParams.get("minPrice") || "",
  //   maxPrice: searchParams.get("maxPrice") || "",
  //   bedroom: searchParams.get("bedroom") || "",
  // });

  const [query, setQuery] = useState({
    book: searchParams.get("book") || "",
    location: searchParams.get("location") || "",
    property: searchParams.get("property") || "",
    Price: searchParams.get("Price") || "",
    twoWheeler: searchParams.get("twoWheeler") || "",
    fourWheeler: searchParams.get("fourWheeler") || "",
  });

  //This setup is useful in scenarios where you need to maintain and manipulate search criteria for filtering or searching purposes in a React application, especially when dealing with URL parameters for navigation or state persistence.

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };
  //! this takes our object from above and converts it into a string to update our url
  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("location")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Book period</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="buy">Overnight</option>
            <option value="rent">Hourly</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="">any</option>
            <option value="office">Office</option>
            <option value="house">House</option>
            <option value="party">Party Palace</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="time">Time (24hr format)</label>
          <input
            type="tel"
            id="time"
            name="time"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.time}
          />
        </div>
        <div className="item">
          <label htmlFor="price">Price</label>
          <input
            type="tel"
            id="Price"
            name="Price"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.Price}
          />
        </div>
        <div className="item">
          <label htmlFor="twoWheeler">Two Wheeler</label>
          <input
            type="text"
            id="twoWheeler"
            name="twoWheeler"
            placeholder="twoWheeler"
            onChange={handleChange}
            defaultValue={query.twoWheeler}
          />
        </div>
        <div className="item">
          <label htmlFor="fourWheeler">Four Wheeler</label>
          <input
            type="text"
            id="fourWheeler"
            name="fourWheeler"
            placeholder="fourWheeler"
            onChange={handleChange}
            defaultValue={query.fourWheeler}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
