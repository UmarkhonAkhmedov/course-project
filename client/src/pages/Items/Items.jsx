import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import LatestSingleItem from "../../components/Home/LatestSingleItem";

function Items() {
  const [fetching, setFetching] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data;

  console.log(data);

  return (
    <div className="container">
      <div style={{ paddingBottom: "100px" }}>
        <h2 style={{ margin: "50px 0 50px 0" }}>
          All Items In This Collection
        </h2>
        <div className="latest__lists">
          {data.map((item) => (
            <LatestSingleItem
              fetching={fetching}
              setFetching={setFetching}
              key={item.id}
              name={item.name}
              tags={item.tags}
              data={data}
              id={item.id}
              likes={0}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Items;
