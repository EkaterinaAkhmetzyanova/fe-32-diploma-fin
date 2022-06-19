import { useState, useContext, Fragment } from "react";
import AppContext from "AppContext";
import { setSubscribe } from "../../../api/http/setSubscribe";
import { infoBox, errorBox, httpErrorBox } from "api/gui";
import { verifyEmail } from "api/utils";
import "./Subscription.css";

export default function Subscription() {
  const [email, setEmail] = useState("");
  const { setAnimation, setPopup } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const mail = email.trim();
    if (!mail) {
      errorBox(setPopup, "Поле обязательно для заполнения");
      setEmail("");
      return;
    }

    if (!verifyEmail(mail)) {
      errorBox(setPopup, "Неправильный формат ввода email");
      setEmail(mail);
      return;
    }

    setEmail("");
    const response = await setSubscribe(setAnimation, mail);
    if (response.ok) {
      infoBox(
        setPopup,
        `На вашу почту ${mail} отправлено письмо для подтверждения подписки`
      );
    } else {
      httpErrorBox(setPopup, response);
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Fragment>
      <form className="footer__subscribe" onSubmit={handleSubmit}>
        <h3 className="footer__subscription__title">Подписка</h3>
        <label className="footer__subscription__label">
          Будьте в курсе событий
        </label>
        <input
          className="footer__subscription__input"
          name="email"
          type="text"
          value={email}
          placeholder="e-mail"
          onChange={handleChange}
        />
        <button className="footer__subscribe__btn" type="submit">
          Отправить
        </button>
      </form>
    </Fragment>
  );
}
