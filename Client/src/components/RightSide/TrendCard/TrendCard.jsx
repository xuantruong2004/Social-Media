import React from "react";

import "./TrendCard.scss";
import { TrendData } from "../../../Data/TrendData";

function TrendCard(props) {
  return (
    <div className="TrendCard">
      <h3>Trends for you</h3>
      {TrendData.map((trend, id) => (
        <div key={id} className="Trend">
          <span>#{trend.name}</span>
          <span>{trend.shares}k shares</span>
        </div>
      ))}
    </div>
  );
}

export default TrendCard;
