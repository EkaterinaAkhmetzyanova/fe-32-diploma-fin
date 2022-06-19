import PropTypes from "prop-types";
import "./TrainSeatsHeader.css";
import icons from "components/Main/icons.svg";
import { secToDate, secToHourMin, durationToHourMinText } from "api/utils";

export default function TrainSeatsHeader(props) {
  const { trainInfo, isForward } = props;

  const { from, to, train, duration } = trainInfo;

  const durationText = durationToHourMinText(duration);

  return (
    <div className="train-seats-header">
      <div className="train-seats-header__left">
        <div className="train-seats-header__left-icon-container">
          <svg className="train-seats-header__icon" width="15" height="18">
            <use xlinkHref={icons + "#train-face"} />
          </svg>
        </div>
        <div className="train-seats-header__text-container">
          <p className="train-seats-header__train-number">{train._id}</p>
          <div className="train-seats-header__train-properties">
            <p className="train-seats-header__train-property">
              {from.city.name} &#x2192;
            </p>
            <p className="train-seats-header__train-property">{to.city.name}</p>
            <p className="train-seats-header__train-property">
              {train.name && `\u00ab${train.name}\u00bb`}
            </p>
          </div>
        </div>
      </div>
      <div className="train-seats-header__middle">
        <div className="train-seats-header__middle-from">
          <p className="train-seats-header__time">
            {secToHourMin(isForward ? from.datetime : to.datetime)}
          </p>
          <p className="train-seats-header__date">
            {secToDate(isForward ? from.datetime : to.datetime)}
          </p>
          <p className="train-seats-header__city">
            {isForward ? from.city.name : to.city.name}
          </p>
          <p className="train-seats-header__station">
            {isForward ? from.railway_station_name : to.railway_station_name}
          </p>
        </div>
        <svg
          className={
            "train-seats-header__arrow" +
            (isForward ? "" : " train-seats-header__arrow_mirror")
          }
          width="30"
          height="20"
        >
          <use xlinkHref={icons + "#arrow"} />
        </svg>
        <div className="train-seats-header__middle-to">
          <p className="train-seats-header__time">
            {secToHourMin(isForward ? to.datetime : from.datetime)}
          </p>
          <p className="train-seats-header__date">
            {secToDate(isForward ? to.datetime : from.datetime)}
          </p>
          <p className="train-seats-header__city">
            {isForward ? to.city.name : from.city.name}
          </p>
          <p className="train-seats-header__station">
            {isForward ? to.railway_station_name : from.railway_station_name}
          </p>
        </div>
      </div>
      <div className="train-seats-header__right">
        <svg className="train-seats-header__icon-clock" width="30" height="30">
          <use xlinkHref={icons + "#clock"} />
        </svg>
        <p className="train-seats-header__duration">
          {durationText.hour}
          <br />
          {durationText.min}
        </p>
      </div>
    </div>
  );
}

TrainSeatsHeader.propTypes = {
  trainInfo: PropTypes.object.isRequired,
  isForward: PropTypes.bool.isRequired,
};
