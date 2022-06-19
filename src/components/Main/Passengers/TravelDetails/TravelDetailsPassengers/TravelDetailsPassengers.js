import PropTypes from "prop-types";
import "./TravelDetailsPassengers.css";
import icons from "components/Main/icons.svg";
import { separateThousands } from "api/utils";

export default function TravelDetailsPassengers(props) {
  const { isCollapsed, setCollapsed, priceInfo } = props;

  return (
    <div className="travel-details-passengers">
      <div className="travel-details-passengers__collapsed">
        <svg className="travel-details-passengers__icon" width="26" height="26">
          <use xlinkHref={icons + "#passenger"} />
        </svg>
        <p className="travel-details-passengers__title">Пассажиры</p>
        <button
          className={
            "travel-details-passengers__button" +
            (isCollapsed ? "" : " travel-details-passengers__button_minus")
          }
          type="button"
          onClick={setCollapsed}
        ></button>
      </div>
      {!isCollapsed && (
        <div className="travel-details-passengers__full">
          {!!priceInfo.adult.count && (
            <div className="travel-details-passengers__item">
              <p className="travel-details-passengers__count">
                {priceInfo.adult.count}
              </p>
              <p className="travel-details-passengers__price">
                {separateThousands(priceInfo.adult.price)}
              </p>
              <p className="travel-details-passengers__currency">&#x20bd;</p>
            </div>
          )}
          {!!priceInfo.child.count && (
            <div className="travel-details-passengers__item">
              <p className="travel-details-passengers__count">
                {priceInfo.child.count}
              </p>
              <p className="travel-details-passengers__price">
                {separateThousands(priceInfo.child.price)}
              </p>
              <p className="travel-details-passengers__currency">&#x20bd;</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

TravelDetailsPassengers.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  priceInfo: PropTypes.object.isRequired,
};
