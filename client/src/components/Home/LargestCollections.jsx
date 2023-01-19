import { Button, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./largestCollections.css";

function LargestCollections() {
  const { i18n, t } = useTranslation(["Home"]);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    await axios
      .get("https://course-project-rgk2.vercel.app/collections/withItems")
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="largest">
      <h2>{t("oldest")}</h2>
      <div className="largest__list">
        {data.slice(0, 5).map((item, index) => (
          <Paper className="largest__item" elevation={5} key={index}>
            <div>
              <img className="largest__item--img" src={item.img} />
              <h4>{item.name}</h4>
              <p style={{ marginBottom: "10px" }}>{item.description}</p>
              <p className="largest__item--number">
                {t("numberItems")}: {item.items.length}
              </p>
              <Link to={`/items/${item.id}`} state={{ data: item.items }}>
                <Button variant="outlined" sx={{ marginTop: "20px" }}>
                  {t("seeItems")}
                </Button>
              </Link>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default LargestCollections;
