import "./Contacts.css";
import icons from "./icons.svg";

export default function Contacts() {
  return (
    <div className="contacts" id="contacts">
      <h3 className="contacts__title">Свяжитесь с нами</h3>
      <ul className="contacts__list">
        <li className="contacts__list-item">
          <div className="contacts__link-container">
            <a className="contacts__link" href="tel:+78000000000">
              <svg className="contacts__icon" width="30" height="30">
                <use xlinkHref={icons + "#phone"} />
              </svg>
            </a>
          </div>
          <p className="contacts__text">8 (800) 000 00 00</p>
        </li>
        <li className="contacts__list-item">
          <div className="contacts__link-container">
            <a className="contacts__link" href="mailto:inbox@mail.ru">
              <svg className="contacts__icon" width="30" height="25">
                <use xlinkHref={icons + "#email"} />
              </svg>
            </a>
          </div>
          <p className="contacts__text">inbox@mail.ru</p>
        </li>
        <li className="contacts__list-item">
          <div className="contacts__link-container">
            <a className="contacts__link" href="skype:tu.train.tickets?call">
              <svg className="contacts__icon" width="30" height="30">
                <use xlinkHref={icons + "#skype"} />
              </svg>
            </a>
          </div>
          <p className="contacts__text">tu.train.tickets</p>
        </li>
        <li className="contacts__list-item contacts__list-item_geolocation">
          <div className="contacts__link-container">
            <a className="contacts__link" href="https://yandex.ru/maps/">
              <svg className="contacts__icon" width="21" height="30">
                <use xlinkHref={icons + "#location"} />
              </svg>
            </a>
          </div>
          <p className="contacts__text">
            г. Москва
            <br />
            ул. Московская 27-35
            <br />
            555 555
          </p>
        </li>
      </ul>
    </div>
  );
}
