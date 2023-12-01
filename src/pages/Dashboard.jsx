import React from "react";
import "../Styles/Dashboard.css";
import { FaChartBar, FaShoppingCart, FaThumbsUp, FaUserAstronaut } from 'react-icons/fa';
import Donut from "../charts/DonutChart";
import SplineArea from "../charts/SplineArea";
import MixedChart from "../charts/MixedChart";
import BarChart from "../charts/BarChart";
export default function Dashboard() {
  return (
    <div className="dash-container">
      <div className="dash-top">
        <div className="dash-top-items">
          <div className="icon">
            <FaShoppingCart/>
          </div>
          <div className="values">
            <span>Profit</span>
            <span>2500k</span>
          </div>
        </div>
        <div className="dash-top-items">
          <div className="icon">
            <FaThumbsUp/>
          </div>
          <div className="values">
            <span>Likes</span>
            <span>1235</span>
          </div>
        </div>
        <div className="dash-top-items">
          <div className="icon">
            <FaChartBar/>
          </div>
          <div className="values">
            <span>Sales</span>
            <span>550</span>
          </div>
        </div>
        <div className="dash-top-items">
          <div className="icon">
            <FaUserAstronaut/>
          </div>
          <div className="values">
            <span>New Members</span>
            <span>255</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="chart1">
          <SplineArea/>
        </div>
        <div className="chart2"><MixedChart/></div>
        <div className="chart3"><BarChart/></div>
        <div className="chart4"><Donut/></div>
      </div>
    </div>
  );
}
