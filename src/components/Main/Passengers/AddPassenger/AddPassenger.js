import PropTypes from "prop-types";
import "./AddPassenger.css";

export default function AddPassenger(props) {
  const { add } = props;

  return (
    <div className="add-passenger" onClick={add}>
      <h3 className="add-passenger__title">Добавить пассажира</h3>
      <button className="add-passenger__button" type="button">
        +
      </button>
    </div>
  );
}

AddPassenger.propTypes = {
  add: PropTypes.func.isRequired,
};
