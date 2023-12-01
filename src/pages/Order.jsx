import React, { useState } from "react";
import List from "../components/List";
import { useEffect } from "react";
import {
  handleFilterOrder,
  handleSearch,
  handleSearchType,
} from "../utils/SearchFilter";
import axios from "axios";
import { toast } from "react-toastify";

export default function Order({ toggle }) {
  const [data, setData] = useState([]);

  const [searchType, setSearchType] = useState(); // eslint-disable-next-line
  const [select, setSelect] = useState(["All", "Productname", "Customername"]);
  const [filteredData, setFilteredData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then((res) => {
        setData(res.data);
        setNewData(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  } 

  const removeOrder = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/orders/${id}`
      );
      const updatedData = data.filter((order) => order._id !== id);
      setData(updatedData);
      if (response.data && response.data.message) {
        toast.info(response.data.message, {
          pauseOnHover: false,
        });
        // console.log(response.data.message);
      } else if (response.data && typeof response.data === "string") {
        toast.info(response.data, {
          pauseOnHover: false,
        });
        // console.log(response.data);
      } else {
        console.warn("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response) {
        toast.error(error.response.data.error);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  useEffect(() => {
    handleFilterOrder(
      searchType,
      newData,
      searchItem,
      setFilteredData,
      filteredData
    ); // eslint-disable-next-line
  }, [searchItem, searchType]);

  useEffect(() => {
    setData([...filteredData]);
  }, [filteredData, searchType]); //searchbox state should be inside useEffect
  // console.log(filteredData);

  return (
    <div>
      <List
        toggle={toggle}
        select={select}
        handleSearch={handleSearch}
        handleSearchType={handleSearchType}
        setSearchType={setSearchType}
        setFilterData={setData}
        newData={newData}
        setSearchItem={setSearchItem}
        removeOrder={removeOrder}
        searchItem={searchItem}
        list={data}
        listType="order"
      />
    </div>
  );
}
