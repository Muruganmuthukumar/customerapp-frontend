import React, { useEffect, useState } from "react";
import List from "../components/List";
import {
  handleFilterCustomer,
  handleSearch,
  handleSearchType,
} from "../utils/SearchFilter";
import axios from "axios";
import { toast } from "react-toastify";

export default function Customer({ toggle }) {
  const [data, setData] = useState([]);
  const [searchType, setSearchType] = useState(""); // eslint-disable-next-line
  const [select, setSelect] = useState([
    "All",
    "Firstname",
    "Lastname",
    "Email",
    "Mobile",
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`
      );
      setData(response.data);
      setNewData(response.data);
      // console.log(response);
    } catch (error) {
      console.error(error.message);
      if (error.response) {
        console.error(error.response.data);
        toast.error(error.response.data.error || "Error fetching data");
      } else if (error.request) {
        console.error(error.request);
        toast.error("Error fetching data");
      } else {
        console.error("Error", error.message);
        toast.error("Error fetching data");
      }
    }
  };

  const removeCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/users/${id}`
      );
      const updatedData = data.filter((user) => user._id !== id);
      setData(updatedData);

      if (typeof response.data === "string") {
        toast.info(response.data, {
          pauseOnHover: false,
        });
      } else if (response.data.message) {
        toast.info(response.data.message, {
          pauseOnHover: false,
        });
      } else {
        console.warn("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.log(error);
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
    handleFilterCustomer(
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
    <>
      <div>
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
            removeCustomer={removeCustomer}
            searchItem={searchItem}
            list={data}
            listType="customer"
          />
        </div>
      </div>
    </>
  );
}
