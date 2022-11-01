import React, { useState, useEffect } from "react";
import axios from "axios";
import "./latestItems.css";
import LatestSingleItem from "./LatestSingleItem";

function LatestItems() {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchData = async () => {
    await axios.get("http://localhost:8000/items/like").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetching]);

  return (
    <div className="latest">
      <h2>The List Of the Latest Items</h2>
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
            likes={item.likes.length}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestItems;
