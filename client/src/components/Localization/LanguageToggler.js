import { useTranslation } from "react-i18next";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function LanguageToggler() {
  const { i18n, t } = useTranslation(["Home"]);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("i18nextLng", String(e.target.value));
  };

  return (
    <FormControl sx={{ minWidth: 100 }}>
      <Select
        sx={{ height: "45px" }}
        value={localStorage.getItem("i18nextLng") || ""}
        onChange={handleLanguageChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="en">{t("lan1")}</MenuItem>
        <MenuItem value="uz">{t("lan2")}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default LanguageToggler;
