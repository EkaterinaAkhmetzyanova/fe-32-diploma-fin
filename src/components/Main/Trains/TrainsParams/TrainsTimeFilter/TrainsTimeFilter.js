import { useState } from "react";
import PropTypes from "prop-types";
import "./TrainsTimeFilter.css";
import TimeRangeBar from "./TimeRangeBar/TimeRangeBar";
import icons from "components/Main/icons.svg";

export default function TrainsTimeFilter(props) {
  const { times, setTimes, changeTimes, isStart, isDisabled } = props;
  const { departureHourFrom, departureHourTo, arrivalHourFrom, arrivalHourTo } =
    times;
  const {
    setDepartureHourFrom,
    setDepartureHourTo,
    setArrivalHourFrom,
    setArrivalHourTo,
  } = setTimes;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const changeDepartureTimes = (minValue, maxValue) => {
    const times = {
      departureHourFrom: minValue,
      departureHourTo: maxValue,
      arrivalHourFrom,
      arrivalHourTo,
    };
    changeTimes(times);
  };

  const changeArrivalTimes = (minValue, maxValue) => {
    const times = {
      departureHourFrom,
      departureHourTo,
      arrivalHourFrom: minValue,
      arrivalHourTo: maxValue,
    };
    changeTimes(times);
  };

  return (
    <div className="trains-time-filter">
      <div
        className={
          "trains-time-filter__collapsed" +
          (isCollapsed ? "" : " trains-time-filter__collapsed_exp")
        }
      >
        <svg
          className={
            "trains-time-filter__arrow" +
            (isStart ? "" : " trains-time-filter__arrow_mirror")
          }
          width="32"
          height="26"
        >
          <use xlinkHref={icons + "#arrow-negative"} />
        </svg>
        <p className="trains-time-filter__title">
          {isStart ? "Туда" : "Обратно"}
        </p>
        <button
          className={
            "trains-time-filter__button" +
            (isCollapsed ? "" : " trains-time-filter__button_minus")
          }
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        ></button>
      </div>
      {!isCollapsed && (
        <div className="trains-time-filter__full">
          <p className="trains-time-filter__bar-title trains-time-filter__bar-title_departure">
            Время отбытия
          </p>
          <div className="trains-time-filter__bar">
            <TimeRangeBar
              minValue={departureHourFrom}
              maxValue={departureHourTo}
              setMinValue={setDepartureHourFrom}
              setMaxValue={setDepartureHourTo}
              changeRange={changeDepartureTimes}
              isDisabled={isDisabled}
            />
          </div>
          <p className="trains-time-filter__bar-title trains-time-filter__bar-title_arrival">
            Время прибытия
          </p>
          <div className="trains-time-filter__bar">
            <TimeRangeBar
              minValue={arrivalHourFrom}
              maxValue={arrivalHourTo}
              setMinValue={setArrivalHourFrom}
              setMaxValue={setArrivalHourTo}
              changeRange={changeArrivalTimes}
              isDisabled={isDisabled}
            />
          </div>
        </div>
      )}
    </div>
  );
}

TrainsTimeFilter.propTypes = {
  times: PropTypes.objectOf(PropTypes.number),
  setTimes: PropTypes.objectOf(PropTypes.func),
  changeTimes: PropTypes.func.isRequired,
  isStart: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
