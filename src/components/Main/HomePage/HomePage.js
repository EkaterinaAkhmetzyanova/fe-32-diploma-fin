import { useContext, useEffect } from "react";
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
      <About />
      <Description />
      <Feedbacks />
    </main>
  );
}
