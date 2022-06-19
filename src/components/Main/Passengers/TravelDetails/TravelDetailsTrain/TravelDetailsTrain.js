import PropTypes from "prop-types";
import "./TravelDetailsTrain.css";
import icons from "components/Main/icons.svg";
import { secToDate, secToHourMin, durationToHourMin } from "api/utils";

export default function TravelDetailsTrain(props) {
  const { isForward, isCollapsed, setCollapsed, train } = props;

  return (
    <div className="travel-details-train">
      <div className="travel-details-train__collapsed">
        <svg
          className={
            "travel-details-train__arrow-neg" +
            (isForward ? "" : " travel-details-train__arrow-neg_mirror")
          }
          width="32"
          height="26"
        >
          <use xlinkHref={icons + "#arrow-negative"} />
        </svg>
        <p className="travel-details-train__title">
          {isForward ? "Туда" : "Обратно"}
        </p>
        <p
          className={
            "travel-details-train__title-date" +
            (isForward ? "" : " travel-details-train__title-date_backward")
          }
        >
          {secToDate(isForward ? train.from.datetime : train.to.datetime)}
        </p>
        <button
          className={
            "travel-details-train__button" +
            (isCollapsed ? "" : " travel-details-train__button_minus")
          }
          type="button"
          onClick={setCollapsed}
        ></button>
      </div>
      {!isCollapsed && (
        <div className="travel-details-train__full">
          <div className="travel-details-train__number">
            <p className="travel-details-train__number-left">№ Поезда</p>
            <p className="travel-details-train__number-right">
              {train.train._id}
            </p>
          </div>
          <div className="travel-details-train__name">
            <p className="travel-details-train__name-left">Название</p>
            <p className="travel-details-train__name-right">
              {train.from.city.name}
              <br />
              {train.to.city.name}
              <br />
              {!!train.train.name && train.train.name}
            </p>
          </div>
          <p className="travel-details-train__duration">
            {durationToHourMin(train.duration)}
          </p>
          <div className="travel-details-train__times">
            <p className="travel-details-train__time-left">
              {secToHourMin(
                isForward ? train.from.datetime : train.to.datetime
              )}
            </p>
            <svg
              className={
                "travel-details-train__arrow" +
                (isForward ? "" : " travel-details-train__arrow_mirror")
              }
              width="30"
              height="20"
            >
              <use xlinkHref={icons + "#arrow"} />
            </svg>
            <p className="travel-details-train__time-right">
              {secToHourMin(
                isForward ? train.to.datetime : train.from.datetime
              )}
            </p>
          </div>
          <div className="travel-details-train__dates">
            <p className="travel-details-train__date-left">
              {secToDate(isForward ? train.from.datetime : train.to.datetime)}
            </p>
            <p className="travel-details-train__date-right">
              {secToDate(isForward ? train.to.datetime : train.from.datetime)}
            </p>
          </div>
          <div className="travel-details-train__cities">
            <p className="travel-details-train__city-left">
              {isForward ? train.from.city.name : train.to.city.name}
            </p>
            <p className="travel-details-train__city-right">
              {isForward ? train.to.city.name : train.from.city.name}
            </p>
          </div>
          <div className="travel-details-train__stations">
            <p className="travel-details-train__station-left">
              {isForward
                ? train.from.railway_station_name
                : train.to.railway_station_name}
            </p>
            <p className="travel-details-train__station-right">
              {isForward
                ? train.to.railway_station_name
                : train.from.railway_station_name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

TravelDetailsTrain.propTypes = {
  isForward: PropTypes.bool.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  train: PropTypes.object.isRequired,
};
