import { useTranslation } from "react-i18next";

function LanguageToggler() {
  const { i18n, t } = useTranslation(["Home"]);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("i18nextLng", String(e.target.value));
  };

  return (
    <select
      value={localStorage.getItem("i18nextLng") || ""}
      onChange={handleLanguageChange}
      className="lan__select"
    >
      <option value="en">{t("lan1")}</option>
      <option value="uz">{t("lan2")}</option>
    </select>
  );
}

export default LanguageToggler;
