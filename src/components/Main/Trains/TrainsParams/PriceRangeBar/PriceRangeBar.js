import { useState } from "react";
import PropTypes from "prop-types";
import "./PriceRangeBar.css";

export default function PriceRangeBar(props) {
  const {
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    changeRange,
    isDisabled,
  } = props;

  const [curX, setCurX] = useState(0);

  const minLimit = 500;
  const maxLimit = 5000;
  const step = 100;
  const minDiff = 1000;

  let curMinValue = minValue >= minLimit ? minValue : minLimit;
  let curMaxValue = maxValue <= maxLimit ? maxValue : maxLimit;
  if (curMinValue + minDiff > curMaxValue) {
    curMinValue = minLimit;
    curMaxValue = maxLimit;
  }

  const curMinPos = Math.round(
    ((curMinValue - minLimit) / (maxLimit - minLimit)) * 100
  );
  const curMaxPos =
    100 - Math.round(((curMaxValue - minLimit) / (maxLimit - minLimit)) * 100);

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

    const deltaX =
      (evt.target.parentElement.parentElement.clientWidth * step) /
      (maxLimit - minLimit);

    if (evt.clientX > curX + deltaX) {
      setCurX(evt.clientX);
      if (curMinValue + minDiff < curMaxValue) {
        curMinValue += step;
        setMinValue(curMinValue);
      }
    }

    if (evt.clientX < curX - deltaX) {
      setCurX(evt.clientX);
      if (curMinValue > minLimit) {
        curMinValue -= step;
        setMinValue(curMinValue > minLimit ? curMinValue : minLimit);
      }
    }
  };

  const onPointerMoveMax = (evt) => {
    if (evt.buttons !== 1 || isDisabled) {
      return;
    }

    const deltaX =
      (evt.target.parentElement.parentElement.clientWidth * step) /
      (maxLimit - minLimit);

    if (evt.clientX < curX - deltaX) {
      setCurX(evt.clientX);
      if (curMinValue + minDiff < curMaxValue) {
        curMaxValue -= step;
        setMaxValue(curMaxValue);
      }
    }

    if (evt.clientX > curX + deltaX) {
      setCurX(evt.clientX);
      if (curMaxValue < maxLimit) {
        curMaxValue += step;
        setMaxValue(curMaxValue < maxLimit ? curMaxValue : maxLimit);
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
    <div className="price-range-bar">
      <div
        className={
          "price-range-bar__range" +
          (isDisabled ? " price-range-bar__range_disabled" : "")
        }
        style={{ left: `${curMinPos}%`, right: `${curMaxPos}%` }}
      >
        <div
          className="price-range-bar__handle price-range-bar__handle-min"
          onPointerDown={onPointerDownMin}
          onPointerMove={onPointerMoveMin}
          onPointerUp={onPointerUpMin}
        >
          <p className="price-range-bar__handle-title">от</p>
          <p className="price-range-bar__handle-value">
            {curMinValue > minLimit ? curMinValue : "min"}
          </p>
        </div>
        <div
          className="price-range-bar__handle price-range-bar__handle-max"
          onPointerDown={onPointerDownMax}
          onPointerMove={onPointerMoveMax}
          onPointerUp={onPointerUpMax}
        >
          <p className="price-range-bar__handle-title">до</p>
          <p className="price-range-bar__handle-value">
            {curMaxValue < maxLimit ? curMaxValue : "max"}
          </p>
        </div>
      </div>
    </div>
  );
}

PriceRangeBar.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  setMinValue: PropTypes.func.isRequired,
  setMaxValue: PropTypes.func.isRequired,
  changeRange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
