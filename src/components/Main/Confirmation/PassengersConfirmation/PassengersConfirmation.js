import { useContext } from "react";
import { Link } from "react-router-dom";
import "./PassengersConfirmation.css";
import AppContext from "AppContext";
import icons from "components/Main/icons.svg";
import {
  separateBirthdaySertificateNumber,
  separateThousands,
  totalTicketPrice,
} from "api/utils";
import shortid from "shortid";

export default function PassengersConfirmation() {
  const { orderInfo } = useContext(AppContext);
  const { passengerList } = orderInfo;

  return (
    <div className="passengers-confirmation">
      <h3 className="passengers-confirmation__title">Пассажиры</h3>
      <div className="passengers-confirmation__body">
        <div className="passengers-confirmation__left">
          {passengerList && passengerList.length && (
            <ul className="passengers-confirmation__list">
              {passengerList.map((item) => (
                <li
                  className="passengers-confirmation__list-item"
                  key={shortid.generate()}
                >
                  <div className="passengers-confirmation__list-item-title">
                    <svg
                      className="passengers-confirmation__icon"
                      width="68"
                      height="68"
                    >
                      <use xlinkHref={icons + "#passenger-negative"} />
                    </svg>
                    <p className="passengers-confirmation__list-item-title-text">
                      {item.isAdult ? "Взрослый" : "Детский"}
                    </p>
                  </div>
                  <div className="passengers-confirmation__list-item-body">
                    <p className="passengers-confirmation__list-item-name">
                      {item.lastName} {item.firstName} {item.patronymic}
                    </p>
                    <p className="passengers-confirmation__list-item-text">
                      Пол {item.gender ? "мужской" : "женский"}
                    </p>
                    <p className="passengers-confirmation__list-item-text">
                      Дата рождения {item.birthday}
                    </p>
                    <p className="passengers-confirmation__list-item-text">
                      {item.documentType}&nbsp;
                      {item.documentType === "Паспорт РФ"
                        ? `${item.passportSeries} ${item.passportNumber}`
                        : separateBirthdaySertificateNumber(
                            item.birthSertificateNumber
                          )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="passengers-confirmation__right">
          <div className="passengers-confirmation__total">
            <p className="passengers-confirmation__total-title">Всего</p>
            <p className="passengers-confirmation__price">
              {separateThousands(totalTicketPrice(orderInfo))}
            </p>
            <p className="passengers-confirmation__currency">&#x20bd;</p>
          </div>
          <Link
            to={process.env.PUBLIC_URL + "/run/passengers"}
            className="passengers-confirmation__button"
          >
            Изменить
          </Link>
        </div>
      </div>
    </div>
  );
}
