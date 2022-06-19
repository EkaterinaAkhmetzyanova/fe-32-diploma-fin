import { useContext } from "react";
import { Link } from "react-router-dom";
import "./PaymentConfirmation.css";
import AppContext from "AppContext";

export default function PaymentConfirmation() {
  const { orderInfo } = useContext(AppContext);
  const {
    user: { paymentMethod },
  } = orderInfo;

  return (
    <div className="payment-confirmation">
      <h3 className="payment-confirmation__title">Способ оплаты</h3>
      <div className="payment-confirmation__body">
        <div className="payment-confirmation__left">
          <p className="payment-confirmation__method">
            {paymentMethod === "online" ? "Онлайн" : "Наличными"}
          </p>
        </div>
        <div className="payment-confirmation__right">
          <Link
            to={process.env.PUBLIC_URL + "/run/payment"}
            className="payment-confirmation__button"
          >
            Изменить
          </Link>
        </div>
      </div>
    </div>
  );
}
