import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppProvider from "./AppProvider";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Main />
        <Footer />
        <Popup />
      </Router>
    </AppProvider>
  );
}

export default App;
