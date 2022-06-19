import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./TrainSeats.css";
import AppContext from "AppContext";
import TrainSeatsHeader from "./TrainSeatsHeader/TrainSeatsHeader";
import SeatsCount from "./SeatsCount/SeatsCount";
import CoachType from "./CoachType/CoachType";
import icons from "components/Main/icons.svg";
import { loadTrainsInfo } from "api/http/loadTrainsInfo";

export default function TrainSeats(props) {
  const { trainInfo, seatsState, setSeatsState, isForward } = props;

  const { setAnimation, setPopup, trainsInfo, setTrainsInfo } =
    useContext(AppContext);

  const history = useHistory();

  const returnToTrains = async (evt) => {
    evt.preventDefault();

    const result = await loadTrainsInfo(setAnimation, setPopup, setTrainsInfo, {
      ...trainsInfo.params,
      offset: 0,
      direction: isForward ? "forward" : "backward",
    });

    if (result) {
      history.push(process.env.PUBLIC_URL + "/run/trains");
    }
  };

  return (
    <div className="train-seats">
      <div
        className={
          "train-seats__return" +
          (isForward ? "" : " train-seats__return_mirror")
        }
      >
        <svg
          className={
            "train-seats__return-icon" +
            (isForward ? "" : " train-seats__return-icon_mirror")
          }
          width="76"
          height="60"
        >
          <use xlinkHref={icons + "#arrow-negative-big"} />
        </svg>
        <Link
          to={process.env.PUBLIC_URL + "/run/trains"}
          className="train-seats__return-button"
          onClick={returnToTrains}
        >
          Выбрать другой поезд
        </Link>
      </div>
      <TrainSeatsHeader trainInfo={trainInfo} isForward={isForward} />
      <SeatsCount seatsState={seatsState} setSeatsState={setSeatsState} />
      <CoachType seatsState={seatsState} setSeatsState={setSeatsState} />
    </div>
  );
}

TrainSeats.propTypes = {
  trainInfo: PropTypes.object.isRequired,
  seatsState: PropTypes.object.isRequired,
  setSeatsState: PropTypes.func.isRequired,
  isForward: PropTypes.bool.isRequired,
};
