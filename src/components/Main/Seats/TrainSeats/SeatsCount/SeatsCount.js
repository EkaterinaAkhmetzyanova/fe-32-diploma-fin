import PropTypes from "prop-types";
import "./SeatsCount.css";

export default function SeatsCount(props) {
  const { seatsState, setSeatsState } = props;

  const ticketsCount =
    seatsState.fullTicketsCount +
    seatsState.childTicketsCount +
    seatsState.parentTicketsCount;
  const maxCountValue = 6;

  const fullClassName =
    "seats-count__types-item" +
    (seatsState.curTicketType === "full"
      ? " seats-count__types-item_active"
      : "");
  const childClassName =
    "seats-count__types-item" +
    (seatsState.curTicketType === "child"
      ? " seats-count__types-item_active"
      : "");
  const parentClassName =
    "seats-count__types-item" +
    (seatsState.curTicketType === "parent"
      ? " seats-count__types-item_active"
      : "");

  const setCurTicketType = (curTicketType) => {
    setSeatsState({ ...seatsState, curTicketType });
  };

  return (
    <div className="seats-count">
      <h3 className="seats-count__title">Количество билетов</h3>
      <div className="seats-count__types-list">
        <div className={fullClassName} onClick={() => setCurTicketType("full")}>
          <p className="seats-count__type-count">
            Взрослых -{" "}
            {seatsState.fullTicketsCount + seatsState.parentTicketsCount}
          </p>
          <p className="seats-count__type-description">
            Можно добавить ещё
            <br />
            {maxCountValue - ticketsCount} пассажиров
          </p>
        </div>
        <div
          className={childClassName}
          onClick={() => setCurTicketType("child")}
        >
          <p className="seats-count__type-count">
            Детских - {seatsState.childTicketsCount}
          </p>
          <p className="seats-count__type-description">
            Можно добавить еще {maxCountValue - ticketsCount} детей до 10 лет.
            Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%
          </p>
        </div>
        <div
          className={parentClassName}
          onClick={() => setCurTicketType("parent")}
        >
          <p className="seats-count__type-count">
            Детских «без места» - {seatsState.parentTicketsCount}
          </p>
          <p className="seats-count__type-description">
            Автоматически добавляется взрослый билет
          </p>
        </div>
      </div>
    </div>
  );
}

SeatsCount.propTypes = {
  seatsState: PropTypes.object.isRequired,
  setSeatsState: PropTypes.func.isRequired,
};
