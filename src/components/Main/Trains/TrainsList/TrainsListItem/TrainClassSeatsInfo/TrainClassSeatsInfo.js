import PropTypes from "prop-types";
import "./TrainClassSeatsInfo.css";
import { separateThousands } from "api/utils";

export default function TrainClassSeatsInfo(props) {
  const { classNumber, seatsCount, priceInfo } = props;
  const {
    top_price = Infinity,
    bottom_price = Infinity,
    side_price = Infinity,
  } = priceInfo;

  const classNames = ["Люкс", "Купе", "Плацкарт", "Сидячий"];

  return (
    <div className="train-class-seats-info">
      <p className="train-class-seats-info__class-name">
        {classNames[classNumber - 1]}
      </p>
      <p className="train-class-seats-info__seats-count">{seatsCount}</p>
      <p className="train-class-seats-info__before-price">от</p>
      <p className="train-class-seats-info__price">
        {separateThousands(Math.min(top_price, bottom_price, side_price))}
      </p>
      <p className="train-class-seats-info__after-price">&#x20bd;</p>
    </div>
  );
}

TrainClassSeatsInfo.propTypes = {
  classNumber: PropTypes.number.isRequired,
  seatsCount: PropTypes.number.isRequired,
  priceInfo: PropTypes.object.isRequired,
};
