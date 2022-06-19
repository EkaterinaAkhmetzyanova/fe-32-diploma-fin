import { useState } from "react";
import PropTypes from "prop-types";
import "./TimeRangeBar.css";

export default function TimeRangeBar(props) {
  const {
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    changeRange,
    isDisabled,
  } = props;

  const [curX, setCurX] = useState(0);

  const minDiff = 4;

  let curMinValue = minValue >= 0 ? minValue : 0;
  let curMaxValue = maxValue <= 24 ? maxValue : 24;
  if (curMinValue + minDiff > curMaxValue) {
    curMinValue = 0;
    curMaxValue = 24;
  }

  const curMinPos = Math.round((curMinValue / 24) * 100);
  const curMaxPos = 100 - Math.round((curMaxValue / 24) * 100);

  const onPointerDownMin = (evt) => {
    evt.target.setPointerCapture(evt.pointerId);
    setCurX(evt.clientX);
  };

  const onPointerDownMax = (evt) => {
    evt.target.setPointerCapture(evt.pointerId);
    setCurX(evt.clientX);
  };

  const onPointerMoveMin = (evt) => {
    if (evt.buttons !== 1 || isDisabled) {
      return;
    }

    const deltaX = evt.target.parentElement.parentElement.clientWidth / 24;

    if (evt.clientX > curX + deltaX) {
      setCurX(evt.clientX);
      if (curMinValue + minDiff < curMaxValue) {
        setMinValue(curMinValue + 1);
      }
    }

    if (evt.clientX < curX - deltaX) {
      setCurX(evt.clientX);
      if (curMinValue > 0) {
        setMinValue(curMinValue - 1);
      }
    }
  };

  const onPointerMoveMax = (evt) => {
    if (evt.buttons !== 1 || isDisabled) {
      return;
    }

    const deltaX = evt.target.parentElement.parentElement.clientWidth / 24;

    if (evt.clientX < curX - deltaX) {
      setCurX(evt.clientX);
      if (curMinValue + minDiff < curMaxValue) {
        setMaxValue(curMaxValue - 1);
      }
    }

    if (evt.clientX > curX + deltaX) {
      setCurX(evt.clientX);
      if (curMaxValue < 24) {
        setMaxValue(curMaxValue + 1);
      }
    }
  };

  const onPointerUpMin = () => {
    if (isDisabled) {
      return;
    }
    changeRange(minValue, maxValue);
  };

  const onPointerUpMax = () => {
    if (isDisabled) {
      return;
    }
    changeRange(minValue, maxValue);
  };

  return (
    <div className="time-range-bar">
      <div
        className={
          "time-range-bar__range" +
          (isDisabled ? " time-range-bar__range_disabled" : "")
        }
        style={{ left: `${curMinPos}%`, right: `${curMaxPos}%` }}
      >
        <div
          className="time-range-bar__handle time-range-bar__handle-min"
          onPointerDown={onPointerDownMin}
          onPointerMove={onPointerMoveMin}
          onPointerUp={onPointerUpMin}
        >
          <p className="time-range-bar__handle-value">{curMinValue}:00</p>
        </div>
        <div
          className="time-range-bar__handle time-range-bar__handle-max"
          onPointerDown={onPointerDownMax}
          onPointerMove={onPointerMoveMax}
          onPointerUp={onPointerUpMax}
        >
          <p className="time-range-bar__handle-value">{curMaxValue}:00</p>
        </div>
      </div>
    </div>
  );
}

TimeRangeBar.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  setMinValue: PropTypes.func.isRequired,
  setMaxValue: PropTypes.func.isRequired,
  changeRange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
