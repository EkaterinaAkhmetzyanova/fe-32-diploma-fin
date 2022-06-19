import { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "./TrainsListItem.css";
import AppContext from "AppContext";
import TrainClassSeatsInfo from "./TrainClassSeatsInfo/TrainClassSeatsInfo";
import OptionIcons from "../../OptionIcons/OptionIcons";
import icons from "components/Main/icons.svg";
import { secToDate, secToHourMin, durationToHourMin } from "api/utils";
import { loadTrainsInfo } from "api/http/loadTrainsInfo";

export default function TrainsListItem(props) {
  const { trainInfo, isForward, reloadInfo, loadSeats, isConfirmation } = props;
  const {
    from,
    to,
    train,
    duration,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    available_seats_info,
    price_info,
    have_wifi,
    is_express,
    _id,
  } = trainInfo;

  const {
    setAnimation,
    setPopup,
    trainsInfo,
    setTrainsInfo,
    forwardTrain,
    setForwardTrain,
    backwardTrain,
    setBackwardTrain,
  } = useContext(AppContext);

  const history = useHistory();

  const returnToTrains = async () => {
    const result = await loadTrainsInfo(setAnimation, setPopup, setTrainsInfo, {
      ...trainsInfo.params,
      offset: 0,
      direction: isForward ? "forward" : "backward",
    });

    if (result) {
      history.push(process.env.PUBLIC_URL + "/run/trains");
    }
  };

  const goToNextPage = async () => {
    const trainInfoString = JSON.stringify(trainInfo);

    if (isForward) {
      setForwardTrain(JSON.parse(trainInfoString));
      localStorage.setItem("forwardTrain", trainInfoString);
    } else {
      setBackwardTrain(JSON.parse(trainInfoString));
      localStorage.setItem("backwardTrain", trainInfoString);
    }

    if (isForward && !backwardTrain) {
      reloadInfo({
        direction: "backward",
        offset: 0,
      });
    } else {
      const result = isForward
        ? await loadSeats(_id, backwardTrain._id)
        : await loadSeats(forwardTrain._id, _id);
      if (result) {
        history.push(process.env.PUBLIC_URL + "/run/seats");
      }
    }
  };

  return (
    <div className="trains-list-item">
      {isConfirmation && (
        <h3 className="trains-list-item__title">
          Поезд {isForward ? "туда" : "обратно"}
        </h3>
      )}
      <div className="trains-list-item__body">
        <div className="trains-list-item__left">
          <div className="trains-list-item__icon-container">
            <svg className="trains-list-item__icon" width="44" height="52">
              <use xlinkHref={icons + "#train-face"} />
            </svg>
          </div>
          <p className="trains-list-item__train-number">{train._id}</p>
          <div className="trains-list-item__train-properties">
            <p className="trains-list-item__train-property">
              {from.city.name} &#x2192;
            </p>
            <p className="trains-list-item__train-property">{to.city.name}</p>
            <p className="trains-list-item__train-property">
              {train.name && `\u00ab${train.name}\u00bb`}
            </p>
          </div>
        </div>
        <div className="trains-list-item__middle">
          <div className="trains-list-item__middle-from">
            <p className="trains-list-item__time">
              {secToHourMin(isForward ? from.datetime : to.datetime)}
            </p>
            <p className="trains-list-item__date">
              {secToDate(isForward ? from.datetime : to.datetime)}
            </p>
            <p className="trains-list-item__city">
              {isForward ? from.city.name : to.city.name}
            </p>
            <p className="trains-list-item__station">
              {isForward ? from.railway_station_name : to.railway_station_name}
            </p>
          </div>
          <div className="trains-list-item__middle-way">
            <p className="trains-list-item__duration">
              {durationToHourMin(duration)}
            </p>
            <svg
              className={
                "trains-list-item__arrow" +
                (isForward ? "" : " trains-list-item__arrow_mirror")
              }
              width="30"
              height="20"
            >
              <use xlinkHref={icons + "#arrow"} />
            </svg>
          </div>
          <div className="trains-list-item__middle-to">
            <p className="trains-list-item__time">
              {secToHourMin(isForward ? to.datetime : from.datetime)}
            </p>
            <p className="trains-list-item__date">
              {secToDate(isForward ? to.datetime : from.datetime)}
            </p>
            <p className="trains-list-item__city">
              {isForward ? to.city.name : from.city.name}
            </p>
            <p className="trains-list-item__station">
              {isForward ? to.railway_station_name : from.railway_station_name}
            </p>
          </div>
        </div>
        <div className="trains-list-item__right">
          <div className="trains-list-item__seats-info">
            {have_fourth_class && (
              <div className="trains-list-item__train-class-seats-info">
                <TrainClassSeatsInfo
                  classNumber={4}
                  seatsCount={available_seats_info.fourth}
                  priceInfo={price_info.fourth}
                />
              </div>
            )}
            {have_third_class && (
              <div className="trains-list-item__train-class-seats-info">
                <TrainClassSeatsInfo
                  classNumber={3}
                  seatsCount={available_seats_info.third}
                  priceInfo={price_info.third}
                />
              </div>
            )}
            {have_second_class && (
              <div className="trains-list-item__train-class-seats-info">
                <TrainClassSeatsInfo
                  classNumber={2}
                  seatsCount={available_seats_info.second}
                  priceInfo={price_info.second}
                />
              </div>
            )}
            {have_first_class && (
              <div className="trains-list-item__train-class-seats-info">
                <TrainClassSeatsInfo
                  classNumber={1}
                  seatsCount={available_seats_info.first}
                  priceInfo={price_info.first}
                />
              </div>
            )}
          </div>
          <div className="trains-list-item__option-icons">
            <OptionIcons
              haveWifi={have_wifi}
              isExpress={is_express}
              haveFood={true}
              darkColor={true}
            />
          </div>
          {isConfirmation ? (
            <button
              className="trains-list-item__button trains-list-item__button_return"
              type="button"
              onClick={returnToTrains}
            >
              Изменить
            </button>
          ) : (
            <button
              className="trains-list-item__button trains-list-item__button_next"
              type="button"
              onClick={goToNextPage}
            >
              Выбрать места
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

TrainsListItem.propTypes = {
  trainInfo: PropTypes.object.isRequired,
  isForward: PropTypes.bool.isRequired,
  reloadInfo: PropTypes.func.isRequired,
  loadSeats: PropTypes.func.isRequired,
  isConfirmation: PropTypes.bool.isRequired,
};
