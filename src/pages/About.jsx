import React from "react";
import "../Styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="heading">
        <h1>About</h1>
      </div>
      <div className="about-content">
        <div className="header">
          <h3>Welcome to Cartify Admin Dashboard</h3>
          <p>
            This is your go-to solution for efficient and streamlined management
            of customer data, product information, and orders. Designed with
            simplicity in mind, our platform empowers you to perform CRUD
            (Create, Read, Update, Delete) operations seamlessly. Whether you're
            handling customer records, managing products, or overseeing orders,
            we've got you covered.
          </p>
        </div>
        <div className="working">
          <h3>How this Works</h3>
          <ul>
            <li>
              <h4>Simple CRUD Operations:</h4>
              <p>
                Easily perform CRUD operations with a user-friendly interface.
                Add, view, update, and delete records with just a few clicks.
              </p>
            </li>
            <li>
              <h4>Intuitive Navigation:</h4>
              <p>
                Our dashboard is designed for easy navigation, ensuring that you
                can find the information you need quickly and efficiently.
              </p>
            </li>
            <li>
              <h4>Search and Filter Capabilities:</h4>
              <p>
                Utilize our powerful search filters to find the data you're
                looking for. Whether it's by category, brand, name, or any
                attribute, our filters make data retrieval a breeze.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
