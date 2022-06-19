import PropTypes from "prop-types";
import "./CoachSelect.css";
import CoachProperties from "./CoachProperties/CoachProperties";
import shortid from "shortid";

export default function CoachSelect(props) {
  const { seatsState, setSeatsState } = props;

  const coachArray = seatsState.info
    .filter((item) => item.classNumber === seatsState.classNumber)
    .sort((a, b) => a.index - b.index);

  const coachClick = (coachIndex) => {
    const coach = seatsState.info.find((item) => coachIndex === item.index);
    coach.isSelected = !coach.isSelected;
    setSeatsState({ ...seatsState, info: seatsState.info });
  };

  const checkOption = (coachIndex, optionFlagName) => {
    const coach = seatsState.info.find((item) => coachIndex === item.index);
    coach[optionFlagName] = !coach[optionFlagName];
    setSeatsState({ ...seatsState, info: seatsState.info });
  };

  const checkSeat = (coachIndex, seatIndex) => {
    const coach = seatsState.info.find((item) => coachIndex === item.index);

    if (coach.seatsMap[seatIndex].selected) {
      coach.seatsMap[seatIndex].selected = false;
      switch (coach.seatsMap[seatIndex].ticketType) {
        case "full":
          setSeatsState({
            ...seatsState,
            info: seatsState.info,
            fullTicketsCount: seatsState.fullTicketsCount - 1,
          });
          break;
        case "child":
          setSeatsState({
            ...seatsState,
            info: seatsState.info,
            childTicketsCount: seatsState.childTicketsCount - 1,
          });
          break;
        case "parent":
          setSeatsState({
            ...seatsState,
            info: seatsState.info,
            parentTicketsCount: seatsState.parentTicketsCount - 1,
          });
          break;
        default:
      }
    } else if (
      seatsState.fullTicketsCount +
        seatsState.childTicketsCount +
        seatsState.parentTicketsCount >=
      6
    ) {
      return;
    } else {
      coach.seatsMap[seatIndex].selected = true;
      coach.seatsMap[seatIndex].ticketType = seatsState.curTicketType;
      switch (seatsState.curTicketType) {
        case "full":
          setSeatsState({
            ...seatsState,
            info: seatsState.info,
            fullTicketsCount: seatsState.fullTicketsCount + 1,
          });
          break;
        case "child":
          setSeatsState({
            ...seatsState,
            info: seatsState.info,
            childTicketsCount: seatsState.childTicketsCount + 1,
          });
          break;
        case "parent":
          setSeatsState({
            ...seatsState,
            info: seatsState.info,
            parentTicketsCount: seatsState.parentTicketsCount + 1,
          });
          break;
        default:
      }
    }
  };

  return (
    <div className="coach-select">
      <div className="coach-select__header">
        <p className="coach-select__title">Вагоны</p>
        {coachArray.map((item) => (
          <p
            className={
              "coach-select__number" +
              (item.isSelected ? " coach-select__number_selected" : "")
            }
            key={shortid.generate()}
            onClick={() => coachClick(item.index)}
          >
            {item.index > 9 ? item.index : "0" + item.index}
          </p>
        ))}
        <p className="coach-select__numbering">
          Нумерация вагонов начинается с головы поезда
        </p>
      </div>
      {coachArray
        .filter((item) => item.isSelected)
        .map((item) => (
          <div className="coach-select__coach" key={shortid.generate()}>
            <CoachProperties
              coach={item}
              checkOption={checkOption}
              checkSeat={checkSeat}
              competitorCount={seatsState.competitorCount}
            />
          </div>
        ))}
    </div>
  );
}

CoachSelect.propTypes = {
  seatsState: PropTypes.object.isRequired,
  setSeatsState: PropTypes.func.isRequired,
};
