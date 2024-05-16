import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./Search.css";
import Card from "../../Components/Card/Card";

function Search() {
  const [responseData, setResponseData] = useState(null);

  const handleSearchClick = () => {
    fetch(
      "https://backend.cappsule.co.in/api/v1/new_search?q=paracetamol&pharmacyIds=1,2,3"
    )
      .then((response) => response.json())
      .then((data) => {
        setResponseData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  return (
    <>
      <div className="head">Cappsule Web Development Test</div>
      <div className="search-container">
        <div className="search-bar">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Type your medicine here"
            style={{ color: "grey" }}
          />
          <span className="search-text" onClick={handleSearchClick}>
            Search
          </span>
        </div>
      </div>
      <hr className="separator" />
      <Card cardData={responseData && responseData.data.saltSuggestions} />
    </>
  );
}

export default Search;
