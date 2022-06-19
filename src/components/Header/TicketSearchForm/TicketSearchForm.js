import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "./TicketSearchForm.css";
import AppContext from "AppContext";
import LocationInput from "./LocationInput/LocationInput";
import { errorBox, httpErrorBox } from "api/gui";
import { loadCities } from "api/http/loadCities";
import { loadTrainsInfo } from "api/http/loadTrainsInfo";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import buttonInvert from "./button-invert.svg";
import calendar from "./calendar.svg";

registerLocale("ru", ru);

export default function TicketSearchForm(props) {
  const { classModificator } = props;
  const formClassName =
    "ticket-search-form" +
    (classModificator ? ` ticket-search-form${classModificator}` : "");
  const labelClassName =
    "ticket-search-form__label" +
    (classModificator ? ` ticket-search-form__label${classModificator}` : "");
  const buttonClassName =
    "ticket-search-form__button" +
    (classModificator ? ` ticket-search-form__button${classModificator}` : "");

  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const initialFormState = {
    from: "",
    to: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const {
    setPopup,
    setAnimation,
    setTrainsInfo,
    setForwardTrain,
    setBackwardTrain,
  } = useContext(AppContext);
  const history = useHistory();

  const fromChange = (value) => {
    setFormState({ ...formState, from: value });
  };

  const toChange = (value) => {
    setFormState({ ...formState, to: value });
  };

  const invertDirection = () => {
    const from = formState.to;
    const to = formState.from;
    setFormState({ ...formState, from, to });
  };

  const getCityId = async (cityName, field) => {
    const name = cityName.trim();
    const response = await loadCities(setAnimation, name);
    if (!response.ok) {
      httpErrorBox(setPopup, response);
      return null;
    }

    let list;
    try {
      list = await response.json();
    } catch (e) {
      return null;
    }
    const city = list.find((item) => item.name === name);
    return city._id;
  };

  const searchTickets = async (evt) => {
    evt.preventDefault();

    const fromCityId = await getCityId(formState.from, "Откуда");
    if (fromCityId === null) {
      return;
    }

    const toCityId = await getCityId(formState.to, "Куда");
    if (toCityId === null) {
      return;
    }

    if (fromCityId === toCityId) {
      errorBox(
        setPopup,
        'Значения полей "Откуда" и "Куда" не могут быть одинаковыми'
      );
      return;
    }

    const result = await loadTrainsInfo(setAnimation, setPopup, setTrainsInfo, {
      fromCityId,
      toCityId,
      dateStart,
      dateEnd,
      limit: 5,
      offset: 0,
      sort: "date",
      direction: "forward",
    });

    if (!result) {
      return;
    }

    history.push(process.env.PUBLIC_URL + "/run/trains");
    setFormState(initialFormState);
    setForwardTrain(null);
    setBackwardTrain(null);
    localStorage.setItem("forwardTrain", null);
    localStorage.setItem("backwardTrain", null);
  };

  return (
    <form className={formClassName} onSubmit={searchTickets}>
      <label className={labelClassName}>
        Направление
        <div className="ticket-search-form__input-container">
          <LocationInput
            name="from"
            value={formState.from}
            placeholder="Откуда"
            setValue={fromChange}
          />
        </div>
      </label>
      <button
        className="ticket-search-form__button-invert"
        type="button"
        onClick={invertDirection}
      >
        <img
          className="ticket-search-form__image-invert"
          src={buttonInvert}
          width="100%"
          alt="button-invert"
        />
      </button>
      <div className="ticket-search-form__input-container">
        <LocationInput
          name="to"
          value={formState.to}
          placeholder="Куда"
          setValue={toChange}
        />
      </div>
      <label className={labelClassName}>
        Дата
        <div className="ticket-search-form__input-container">
          <DatePicker
            className="date-input__datepicker"
            locale="ru"
            dateFormat="dd/MM/yyyy"
            // minDate={Date.now()}
            selected={dateStart}
            placeholderText="ДД/ММ/ГГ"
            onChange={(date) => setDateStart(date)}
          />
          <div className="date-input__button">
            <img
              className="date-input__button-icon"
              src={calendar}
              width="100%"
              alt="button-calendar"
            />
          </div>
        </div>
      </label>
      <div className="ticket-search-form__input-container">
        <DatePicker
          className="date-input__datepicker"
          locale="ru"
          dateFormat="dd/MM/yyyy"
          // minDate={Date.now()}
          selected={dateEnd}
          placeholderText="ДД/ММ/ГГ"
          onChange={(date) => setDateEnd(date)}
        />
        <div className="date-input__button">
          <img
            className="date-input__button-icon"
            src={calendar}
            width="100%"
            alt="button-calendar"
          />
        </div>
      </div>
      <button className={buttonClassName} type="submit">
        Найти билеты
      </button>
    </form>
  );
}

TicketSearchForm.propTypes = {
  classModificator: PropTypes.string.isRequired,
};
