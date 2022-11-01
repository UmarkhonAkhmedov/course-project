import React from "react";
import LargestCollections from "../../components/Home/LargestCollections";
import LatestItems from "../../components/Home/LatestItems";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <LatestItems />
        <LargestCollections />
      </div>
    </div>
  );
}

export default Home;
