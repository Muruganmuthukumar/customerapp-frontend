import React, { useEffect, useState } from "react";
import "../Styles/List.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  edit_Customer,
} from "../redux/customer/customerSlice";
import {
  edit_Product,
} from "../redux/product/productSlice";
import Card from "./Card";
import {
  edit_Order,
} from "../redux/order/orderSlice";
import Table from "./Table";
import ListTop from "./ListTop";

export default function List({
  toggle,
  handleSearch,
  select,
  handleSearchType,
  setSearchType,
  setFilterData,
  newData,
  setSearchItem,
  removeCustomer,
  removeProduct,
  removeOrder,
  searchItem,
  list,
  listType
}) {
  const [show, setShow] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [newList, setNewList] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = newList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(list.length / itemsPerPage);
 
  useEffect(() => {
    try {
      setNewList([...list]);
      setData([...list]);
      // console.log(newList,"newList");
    } catch (err) {
      console.log("List is Empty", err);
    }
  }, [list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const handleEdit = (data) => {
    switch (listType) {
      case "customer":
        dispatch(edit_Customer(data));
        navigate("/customer-edit");
        break;
      case "product":
        dispatch(edit_Product(data));
        navigate("/product-edit");
        break;
      case "order":
        dispatch(edit_Order(data));
        navigate("/order-edit");
        break;
      default:
        break;
    }
  };
  const handleDelete = (id) => {
    switch (listType) {
      case "customer":
        removeCustomer(id);
        setShow(!show);
        break;
      case "product":
        removeProduct(id);
        setShow(!show);
        break;
      case "order":
        removeOrder(id);
      setShow(!show);
        break;
      default:
        break;
    }
  };

  const handleCreate = () => {
    switch (listType) {
      case "customer":
        navigate("/new-customer");
        break;
      case "product":
        navigate("/new-product");
        break;
      case "order":
        navigate("/new-order");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {show && (
        <div>
          <Card
            handleDelete={handleDelete}
            id={deletingId}
            show={show}
            setShow={setShow}
          />
        </div>
      )}
      <div
        className="pages-container"
        style={{ width: toggle ? "85vw" : "75vw" }}
      >
        <ListTop
          list={list}
          listType={listType}
          data={data}
          handleSearch={handleSearch}
          handleSearchType={handleSearchType}
          handleCreate={handleCreate}
          select={select}
          setSearchType={setSearchType}
          setData={setFilterData}
          newData={newData}
          setSearchItem={setSearchItem}
        />
        <Table
          list={list}
          listType={listType}
          handleEdit={handleEdit}
          currentItems={currentItems}
          setDeletingId={setDeletingId}
          setShow={setShow}
          show={show}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          searchItem={searchItem}
        />
      </div>
    </>
  );
}
