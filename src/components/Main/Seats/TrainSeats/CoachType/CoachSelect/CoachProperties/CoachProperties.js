import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import "./CoachProperties.css";
import icons from "components/Main/icons.svg";
import { separateThousands } from "api/utils";
import {
  getAvailableSeatsCount,
  getTopAvailableSeatsCount,
  getBottomAvailableSeatsCount,
  getSumPrice,
} from "api/seats";

export default function CoachProperties(props) {
  const { coach, checkOption, checkSeat, competitorCount } = props;

  const [showHints, setShowHints] = useState([false, false, false, false]);

  let price1 = null;
  let price2 = null;
  let isTop = false;

  switch (coach.classNumber) {
    case 1:
      price1 = coach.price;
      break;
    case 2:
    case 3:
      price1 = coach.topPrice;
      price2 = coach.bottomPrice;
      isTop = true;
      break;
    case 4:
      price1 = coach.bottomPrice;
      break;
    default:
  }

  const buttonClassName = "coach-properties__button";
  const iconClassName = "coach-properties__button-icon";

  let conditionerClassName = buttonClassName;
  let conditionerIconClassName = iconClassName;
  if (coach.haveAirConditioning) {
    conditionerClassName += ` ${buttonClassName}_included`;
  }

  let wifiClassName = buttonClassName;
  let wifiIconClassName = iconClassName;
  if (coach.haveWifi) {
    wifiClassName += ` ${buttonClassName}_enabled`;
    wifiIconClassName += ` ${iconClassName}_enabled`;
  }
  if (coach.addWifi) {
    wifiClassName += ` ${buttonClassName}_selected`;
    wifiIconClassName += ` ${iconClassName}_selected`;
  }

  let linensClassName = buttonClassName;
  let linensIconClassName = iconClassName;
  if (coach.classNumber !== 4) {
    if (coach.isLinensIncluded) {
      linensClassName += ` ${buttonClassName}_included`;
    } else {
      linensClassName += ` ${buttonClassName}_enabled`;
      linensIconClassName += ` ${iconClassName}_enabled`;

      if (coach.addLinens) {
        linensClassName += ` ${buttonClassName}_selected`;
        linensIconClassName += ` ${iconClassName}_selected`;
      }
    }
  }

  let foodClassName = buttonClassName;
  let foodIconClassName = iconClassName;
  if (coach.haveFood) {
    foodClassName += ` ${buttonClassName}_enabled`;
    foodIconClassName += ` ${iconClassName}_enabled`;
  }
  if (coach.addFood) {
    foodClassName += ` ${buttonClassName}_selected`;
    foodIconClassName += ` ${iconClassName}_selected`;
  }

  const wifiChange = () => {
    if (coach.haveWifi) {
      checkOption(coach.index, "addWifi");
    }
  };

  const linensChange = () => {
    if (coach.classNumber === 4 || coach.isLinensIncluded) {
      return;
    }
    checkOption(coach.index, "addLinens");
  };

  const foodChange = () => {
    if (coach.haveFood) {
      checkOption(coach.index, "addFood");
    }
  };

  const changeHint = (optionIndex, isShow) => {
    const hints = [...showHints];
    hints[optionIndex] = isShow;
    setShowHints(hints);
  };

  const buttonMouseOver = (optionIndex) => {
    changeHint(optionIndex, true);
  };

  const buttonMouseOut = (optionIndex) => {
    changeHint(optionIndex, false);
  };

  let mapClassName =
    "coach-properties__map coach-properties__map_" + coach.classNumber;

  const seatChange = (seatIndex) => {
    if (coach.seatsMap[seatIndex].available) {
      checkSeat(coach.index, seatIndex);
    }
  };

  const sumPrice = getSumPrice(coach);

  return (
    <div className="coach-properties">
      <div className="coach-properties__header">
        <div className="coach-properties__label">
          <p className="coach-properties__index">
            {coach.index > 9 ? coach.index : "0" + coach.index}
          </p>
        </div>
        <div className="coach-properties__seats">
          <p className="coach-properties__seats-all-title">
            Места
            <span className="coach-properties__seats-all-count">
              {getAvailableSeatsCount(coach.seatsMap)}
            </span>
          </p>
          {isTop && (
            <Fragment>
              <p className="coach-properties__seats-title">
                Верхние
                <span className="coach-properties__seats-count">
                  {getTopAvailableSeatsCount(coach.seatsMap)}
                </span>
              </p>
              <p className="coach-properties__seats-title">
                Нижние
                <span className="coach-properties__seats-count">
                  {getBottomAvailableSeatsCount(coach.seatsMap)}
                </span>
              </p>
            </Fragment>
          )}
        </div>
        <div className="coach-properties__prices">
          <p className="coach-properties__prices-title">Стоимость</p>
          <p className="coach-properties__price">
            {separateThousands(price1)}
            <span className="coach-properties__currency">&#x20bd;</span>
          </p>
          {price2 && (
            <p className="coach-properties__price">
              {separateThousands(price2)}
              <span className="coach-properties__currency">&#x20bd;</span>
            </p>
          )}
        </div>
        <div className="coach-properties__service">
          <p className="coach-properties__service-title">
            Обслуживание
            <span className="coach-propertis__service-title_light">Фпк</span>
          </p>
          <ul className="coach-properties__options">
            <li
              className={conditionerClassName}
              onMouseOver={() => buttonMouseOver(0)}
              onMouseOut={() => buttonMouseOut(0)}
            >
              <svg className={conditionerIconClassName} width="21" height="21">
                <use xlinkHref={icons + "#conditioner"} />
              </svg>
              {showHints[0] && (
                <p className="coach-properties__button-hint">Кондиционер</p>
              )}
            </li>
            <li
              className={wifiClassName}
              onClick={wifiChange}
              onMouseOver={() => buttonMouseOver(1)}
              onMouseOut={() => buttonMouseOut(1)}
            >
              <svg className={wifiIconClassName} width="20" height="16">
                <use xlinkHref={icons + "#wifi"} />
              </svg>
              {showHints[1] && (
                <p className="coach-properties__button-hint">WI-FI</p>
              )}
            </li>
            <li
              className={linensClassName}
              onClick={linensChange}
              onMouseOver={() => buttonMouseOver(2)}
              onMouseOut={() => buttonMouseOut(2)}
            >
              <svg className={linensIconClassName} width="22" height="16">
                <use xlinkHref={icons + "#linens"} />
              </svg>
              {showHints[2] && (
                <p className="coach-properties__button-hint">Бельё</p>
              )}
            </li>
            <li
              className={foodClassName}
              onClick={foodChange}
              onMouseOver={() => buttonMouseOver(3)}
              onMouseOut={() => buttonMouseOut(3)}
            >
              <svg className={foodIconClassName} width="20" height="18">
                <use xlinkHref={icons + "#food"} />
              </svg>
              {showHints[3] && (
                <p className="coach-properties__button-hint">Питание</p>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="coach-properties__map-container">
        <p className="coach-properties__hint">
          {competitorCount} человек выбирают места в этом поезде
        </p>
        <div className={mapClassName}>
          <p className="coach-properties__map-label">
            {coach.index > 9 ? coach.index : "0" + coach.index}
          </p>
          {coach.seatsMap.map((item, i) => (
            <p
              className={
                "coach-properties__map-seat" +
                (item.available
                  ? " coach-properties__map-seat_available"
                  : "") +
                (item.selected ? " coach-properties__map-seat_selected" : "") +
                (item.selected && item.ticketType === "child"
                  ? " coach-properties__map-seat_child"
                  : "") +
                (item.selected && item.ticketType === "parent"
                  ? " coach-properties__map-seat_parent"
                  : "")
              }
              key={i}
              style={{
                top: `${item.top}px`,
                left: `${item.left}px`,
                width: `${item.width}px`,
                height: `${item.height}px`,
                paddingTop: `${item.paddingTop}px`,
              }}
              onClick={() => seatChange(i)}
            >
              {i + 1}
            </p>
          ))}
        </div>
        {!!sumPrice && (
          <p className="coach-properties__sum-price">
            {separateThousands(sumPrice)}
            <span className="coach-properties__sum-price-currency">
              &#x20bd;
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

CoachProperties.propTypes = {
  coach: PropTypes.object.isRequired,
  checkOption: PropTypes.func.isRequired,
  checkSeat: PropTypes.func.isRequired,
  competitorCount: PropTypes.number.isRequired,
};
