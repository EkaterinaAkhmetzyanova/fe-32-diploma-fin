import { useContext, useEffect } from "react";
import "./HomePage.css";
import AppContext from "AppContext";
import About from "./About/About";
import Description from "./Description/Description";
import Feedbacks from "./Feedbacks/Feedbacks";

export default function HomePage() {
  const { setBookingStage } = useContext(AppContext);

  useEffect(() => {
    setBookingStage(null);
  }, [setBookingStage]);

  return (
    <main className="home-page">
      <a className="home-page__anchor" href="." name="about">
        anchor
      </a>
      <About />
      <a className="home-page__anchor" href="." name="description">
        anchor
      </a>
      <Description />
      <a className="home-page__anchor" href="." name="feedbacks">
        anchor
      </a>
      <Feedbacks />
    </main>
  );
}
