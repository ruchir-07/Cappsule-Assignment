import React, { useState, useEffect } from "react";
import "../../pages/Search/Search.css";
import "./Card.css";

function Card(props) {
  const { salt_forms_json, salt } = props.data;
  const [selectedForm, setSelectedForm] = useState(
    Object.keys(salt_forms_json)[0]
  );
  const [selectedStrength, setSelectedStrength] = useState(
    Object.keys(salt_forms_json[selectedForm])[0]
  );
  const [selectedPacking, setSelectedPacking] = useState(
    Object.keys(salt_forms_json[selectedForm][selectedStrength])[0]
  );
  const [showAllForms, setShowAllForms] = useState(false);
  const [showAllStrengths, setShowAllStrengths] = useState(false);
  const [showAllPackings, setShowAllPackings] = useState(false);
  const [sellingPrice, setSellingPrice] = useState(
    "No store selling this product near you"
  );

  const handleFormButtonClick = (form) => {
    setSelectedForm(form);
    setSelectedStrength(Object.keys(salt_forms_json[form])[0]);
    setSelectedPacking(
      Object.keys(
        salt_forms_json[form][Object.keys(salt_forms_json[form])[0]]
      )[0]
    );
    setSellingPrice("No store selling this product near you");
  };

  const handleStrengthButtonClick = (strength) => {
    setSelectedStrength(strength);
    setSelectedPacking(Object.keys(salt_forms_json[selectedForm][strength])[0]);
    setSellingPrice("No store selling this product near you");
  };

  const handlePackingButtonClick = (packing) => {
    setSelectedPacking(packing);
    const packingObj = salt_forms_json[selectedForm][selectedStrength][packing];

    if (isAllNull(packingObj)) {
      setSellingPrice("No store selling this product near you");
      return;
    }

    let minPrice = null;
    for (const pharmacyData of Object.values(packingObj)) {
      if (pharmacyData) {
        for (const priceObj of pharmacyData) {
          if (
            priceObj &&
            (minPrice === null || priceObj.selling_price < minPrice)
          ) {
            minPrice = priceObj.selling_price;
          }
        }
      }
    }

    setSellingPrice(minPrice);
  };

  const isAllNull = (data) => {
    for (let key in data) {
      if (data[key] !== null) {
        return false;
      }
    }
    return true;
  };

  const isAllPackingsNull = (strengthData) => {
    for (let packing in strengthData) {
      if (!isAllNull(strengthData[packing])) {
        return false;
      }
    }
    return true;
  };

  const isAllStrengthsNull = (formData) => {
    for (let strength in formData) {
      if (!isAllPackingsNull(formData[strength])) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    handlePackingButtonClick(selectedPacking);
  }, [selectedForm, selectedStrength, selectedPacking]);

  const formsToShow = showAllForms
    ? Object.keys(salt_forms_json)
    : Object.keys(salt_forms_json).slice(0, 4);
  const strengthsToShow = showAllStrengths
    ? Object.keys(salt_forms_json[selectedForm])
    : Object.keys(salt_forms_json[selectedForm]).slice(0, 4);
  const packingsToShow = showAllPackings
    ? Object.keys(salt_forms_json[selectedForm][selectedStrength])
    : Object.keys(salt_forms_json[selectedForm][selectedStrength]).slice(0, 4);
  return (
    <div className="card">
      <div className="card-content">
        <div className="packing-btn">
          <div className="label-row">
            <div>
              Form:
              <div className="form">
                {formsToShow.map((form, index) => (
                  <button
                    key={index}
                    className={`btn1 ${
                      selectedForm === form ? "selected" : ""
                    } ${
                      isAllStrengthsNull(salt_forms_json[form]) ? "no-data" : ""
                    }`}
                    onClick={() => handleFormButtonClick(form)}
                  >
                    {form}
                  </button>
                ))}
                {!showAllForms && Object.keys(salt_forms_json).length > 4 && (
                  <button
                    className="more-btn"
                    onClick={() => setShowAllForms(true)}
                  >
                    more..
                  </button>
                )}
                {showAllForms && (
                  <button
                    className="more-btn"
                    onClick={() => setShowAllForms(false)}
                  >
                    hide..
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="label-row">
            <div>
              Strength:
              <div className="strength">
                {strengthsToShow.map((strength, index) => (
                  <button
                    key={index}
                    className={`btn2 ${
                      selectedStrength === strength ? "selected" : ""
                    } ${
                      isAllPackingsNull(salt_forms_json[selectedForm][strength])
                        ? "no-data"
                        : ""
                    }`}
                    onClick={() => handleStrengthButtonClick(strength)}
                  >
                    {strength}
                  </button>
                ))}
                {!showAllStrengths &&
                  Object.keys(salt_forms_json[selectedForm]).length > 4 && (
                    <button
                      className="more-btn"
                      onClick={() => setShowAllStrengths(true)}
                    >
                      more..
                    </button>
                  )}
                {showAllStrengths && (
                  <button
                    className="more-btn"
                    onClick={() => setShowAllStrengths(false)}
                  >
                    hide..
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="label-row">
            <div>
              Packaging:
              <div className="packing">
                {packingsToShow.map((packing, index) => (
                  <button
                    key={index}
                    className={`btn3 ${
                      selectedPacking === packing ? "selected" : ""
                    } ${
                      isAllNull(
                        salt_forms_json[selectedForm][selectedStrength][packing]
                      )
                        ? "no-data"
                        : ""
                    }`}
                    onClick={() => handlePackingButtonClick(packing)}
                  >
                    {" "}
                    {packing}
                  </button>
                ))}
                {!showAllPackings &&
                  Object.keys(salt_forms_json[selectedForm][selectedStrength])
                    .length > 4 && (
                    <button
                      className="more-btn"
                      onClick={() => setShowAllPackings(true)}
                    >
                      more..
                    </button>
                  )}
                {showAllPackings && (
                  <button
                    className="more-btn"
                    onClick={() => setShowAllPackings(false)}
                  >
                    hide..
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="salt-name">
          {salt}
          <div className="selected-info">
            <p> {selectedForm} | </p>
            <p> {selectedStrength} | </p>
            <p> {selectedPacking}</p>
          </div>
        </div>
        <div
          className={
            sellingPrice == "No store selling this product near you"
              ? "selling-price"
              : "bold-text"
          }
        >
          {sellingPrice === "No store selling this product near you"
            ? sellingPrice
            : `From₹${sellingPrice}`}
        </div>
      </div>
    </div>
  );
}

function CardList(props) {
  const { cardData } = props;

  return (
    <div className="card-list">
      {cardData == null
        ? ""
        : cardData.map((data, index) => <Card key={index} data={data} />)}
    </div>
  );
}

export default CardList;
