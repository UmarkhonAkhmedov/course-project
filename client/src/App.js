import "./App.css";
import { Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation(["Home"]);

  return (
    <Suspense fallback={null}>
      <div className="App">
        <Navbar />
        <button className="button">{t("done")}</button>
      </div>
    </Suspense>
  );
}

export default App;
