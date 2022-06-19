import { useState, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import AppContext from "AppContext";
import { httpErrorBox } from "api/gui";
import { loadCities } from "api/http/loadCities";
import buttonIcon from "./location.svg";
import "./LocationInput.css";

export default function LocationInput(props) {
  const { name, value, placeholder, setValue } = props;

  const [timerId, setTimerId] = useState(null);
  const [citiesList, setCitiesList] = useState([]);
  const [showList, setShowList] = useState(false);
  const { animation, setAnimation, setPopup } = useContext(AppContext);

  const getCities = async (cityName) => {
    const response = await loadCities(setAnimation, cityName);
    if (!response.ok) {
      httpErrorBox(setPopup, response);
    }
    try {
      const list = await response.json();
      setCitiesList(list);
      setShowList(!!list.length);
    } catch (e) {
      setShowList(false);
    }
  };
  console.log(citiesList);
  const timeout = 1000;

  const timer = (text) => {
    getCities(text);
  };

  const changeText = (evt) => {
    if (animation.loading) {
      return;
    }

    clearTimeout(timerId);
    const text = evt.target.value.trimLeft();
    setValue(text);

    if (text.length) {
      setTimerId(setTimeout(() => timer(text), timeout));
    } else {
      setShowList(false);
    }
  };

  const selectCity = (city) => {
    setValue(city);
    setShowList(false);
  };

  return (
    <Fragment>
      <input
        className="location-input__input"
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={changeText}
        required
      />
      <div className="location-input__button">
        <img
          className="location-input__button-icon"
          src={buttonIcon}
          width="100%"
          alt="button-location"
        />
      </div>
      {showList && (
        <ul className="location-input__list" tabIndex="9999">
          {citiesList.map((item) => (
            <li
              className="location-input__list-item"
              key={item._id}
              onClick={() => selectCity(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

LocationInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
