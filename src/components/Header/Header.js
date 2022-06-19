import { useContext } from "react";
import AppContext from "AppContext";
import Menu from "./Menu/Menu";
import TicketSearchForm from "./TicketSearchForm/TicketSearchForm";
import Logo from "./Logo/Logo";
import "./Header.css";

export default function Header() {
  const { bookingStage } = useContext(AppContext);
  let classModificator = "";

  switch (bookingStage) {
    case "trains":
    case "seats":
    case "passengers":
    case "payment":
    case "confirmation":
      classModificator = "_run";
      break;
    case "completion":
      classModificator = "_completion";
      break;
    default:
  }

  const headerClassName =
    "header" + (classModificator ? ` header${classModificator}` : "");
  const headerTopClassName =
    "header__top" + (classModificator ? ` header__top${classModificator}` : "");

  return (
    <header className={headerClassName}>
      <div className={headerTopClassName}>
        <Logo />
      </div>
      <Menu />
      {classModificator !== "_completion" && (
        <div className="header__body">
          {!classModificator && (
            <p className="header__slogan">
              Вся жизнь -
              <br />
              <span className="header__slogan_bold">путешествие!</span>
            </p>
          )}
          <TicketSearchForm classModificator={classModificator} />
        </div>
      )}
    </header>
  );
}
