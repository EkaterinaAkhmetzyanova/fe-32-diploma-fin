import PropTypes from "prop-types";
import "./CoachType.css";
import CoachSelect from "./CoachSelect/CoachSelect";
import icons from "components/Main/icons.svg";

export default function CoachType(props) {
  const { seatsState, setSeatsState } = props;

  const arrayTypes = [
    {
      iconName: "fourth-class",
      className: "Сидячий",
      classNumber: 4,
      margin: 0,
    },
    {
      iconName: "third-class",
      className: "Плацкарт",
      classNumber: 3,
      margin: 80,
    },
    { iconName: "second-class", className: "Купе", classNumber: 2, margin: 45 },
    { iconName: "first-class", className: "Люкс", classNumber: 1, margin: 68 },
  ];

  const iconClick = (classNumber) => {
    setSeatsState({ ...seatsState, classNumber });
  };

  return (
    <div className="coach-type">
      <h3 className="coach-type__title">Тип вагона</h3>
      <ul
        className={
          "coach-type__list" +
          (seatsState.classNumber ? " coach-type__list_active" : "")
        }
      >
        {arrayTypes.map((item, i) => (
          <li
            className="coach-type__item"
            style={{ marginLeft: `${item.margin}px` }}
            key={i}
          >
            <svg
              className={
                "coach-type__icon" +
                (item.classNumber === seatsState.classNumber
                  ? " coach-type__icon_active"
                  : "")
              }
              width="50"
              height="50"
              onClick={() => iconClick(item.classNumber)}
            >
              <use xlinkHref={`${icons}#${item.iconName}`} />
            </svg>
            <p
              className={
                "coach-type__name" +
                (item.classNumber === seatsState.classNumber
                  ? " coach-type__name_active"
                  : "")
              }
            >
              {item.className}
            </p>
          </li>
        ))}
      </ul>
      {!!seatsState.classNumber && (
        <CoachSelect seatsState={seatsState} setSeatsState={setSeatsState} />
      )}
    </div>
  );
}

CoachType.propTypes = {
  seatsState: PropTypes.object.isRequired,
  setSeatsState: PropTypes.func.isRequired,
};
