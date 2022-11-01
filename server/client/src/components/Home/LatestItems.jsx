import React, { useState, useEffect } from "react";
import axios from "axios";
import "./latestItems.css";
import { useTranslation } from "react-i18next";
import LatestSingleItem from "./LatestSingleItem";

function LatestItems() {
  const [data, setData] = useState([]);
  const { i18n, t } = useTranslation(["Home"]);
  const [fetching, setFetching] = useState(false);

  const fetchData = async () => {
    await axios
      .get("https://ua-collects-app.herokuapp.com/items/like")
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="latest">
      <h2>{t("latest")}</h2>
      <div className="latest__lists">
        {[...data].reverse().map((item) => (
          <LatestSingleItem
            fetching={fetching}
            setFetching={setFetching}
            key={item.id}
            name={item.name}
            tags={item.tags}
            data={data}
            id={item.id}
            img={item.img}
            likes={item.likes.length}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestItems;
