import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "AppContext";
import { separateThousands, totalTicketPrice } from "api/utils";
import star from "./star.svg";
import activeStar from "./active-star.svg";
import "./Completion.css";

export default function Completion() {
  const initStar = {
    clicked: false,
    moved: false,
  };
  const [stars, setStars] = useState([
    initStar,
    initStar,
    initStar,
    initStar,
    initStar,
  ]);

  const { setBookingStage, orderInfo } = useContext(AppContext);
  const {
    user: { firstName, patronymic },
  } = orderInfo;

  useEffect(() => {
    setBookingStage("completion");
  }, [setBookingStage]);

  const starClick = (index) => {
    const newStars = stars.map((item, i) => {
      return { clicked: i <= index, moved: item.moved };
    });
    setStars(newStars);
  };

  const starOver = (index) => {
    const newStars = stars.map((item, i) => {
      return { clicked: item.clicked, moved: i <= index };
    });
    setStars(newStars);
  };

  const starsOut = () => {
    const newStars = stars.map((item) => {
      return { clicked: item.clicked, moved: false };
    });
    setStars(newStars);
  };

  return (
    <main className="completion">
      <div className="completion__window">
        <h2 className="completion__title">Благодарим Вас за заказ!</h2>
        <div className="completion__body">
          <div className="completion__order-data">
            <p className="completion__order-number">
              №заказа {Math.trunc(Math.random() * 900 + 100)}АА
            </p>
            <p className="completion__order-sum-title">сумма</p>
            <p className="completion__order-price">
              {separateThousands(totalTicketPrice(orderInfo))}
            </p>
            <p className="completion__order-currency">&#x20bd;</p>
          </div>
          <div className="completion__manual">
            <div className="completion__manual-item">
              <div className="completion__manual-icon completion__manual-icon_1"></div>
              <p className="completion__manual-text">билеты будут</p>
              <p className="completion__manual-text">отправлены</p>
              <p className="completion__manual-text">
                на ваш{" "}
                <span className="completion__manual-text_bold">e-mail</span>
              </p>
            </div>
            <div className="completion__manual-item">
              <div className="completion__manual-icon completion__manual-icon_2"></div>
              <p className="completion__manual-text completion__manual-text_bold">
                распечатайте
              </p>
              <p className="completion__manual-text">и сохраняйте билеты</p>
              <p className="completion__manual-text">до даты поездки</p>
            </div>
            <div className="completion__manual-item">
              <div className="completion__manual-icon completion__manual-icon_3"></div>
              <p className="completion__manual-text completion__manual-text_bold">
                предъявите
              </p>
              <p className="completion__manual-text">распечатанные</p>
              <p className="completion__manual-text">билеты при посадке</p>
            </div>
          </div>
          <div className="completion__text-container">
            <p className="completion__text-title">
              {firstName} {patronymic}!
            </p>
            <p className="completion__text-text">Ваш заказ успешно оформлен.</p>
            <p className="completion__text-text">
              В ближайшее время с Вами свяжется наш оператор для подтверждения.
            </p>
            <p className="completion__text-end">
              Благодарим Вас за оказанное доверие и желаем приятного
              путешествия!
            </p>
          </div>
          <div className="completion__controls">
            <p className="completion__controls-text">Оценить сервис</p>
            <div className="completion__stars-container" onMouseOut={starsOut}>
              {stars.map((item, i) => (
                <div
                  className="completion__star-cell"
                  key={i}
                  onClick={() => starClick(i)}
                  onMouseOver={() => starOver(i)}
                >
                  <img
                    className="completion__star"
                    src={item.clicked || item.moved ? activeStar : star}
                    width="48"
                    height="48"
                    alt="star"
                  />
                </div>
              ))}
            </div>
            <Link to={process.env.PUBLIC_URL} className="completion-button">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
