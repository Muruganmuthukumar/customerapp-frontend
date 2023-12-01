import React from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaRupeeSign, FaSave } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderAdd = ({ toggle }) => {
  const { newOrder } = useSelector((state) => state.order);
  const [editingItem, setEditingItem] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  //   const [productSelect, setProductSelect] = useState("null");
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    setEditingItem({ ...newOrder });
  }, [newOrder]); 

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    let updatedPrice = editingItem.price;
    if (id === "productName") {
      const selectedProduct = productData.find(
        (product) => product.title === value
      );
      updatedPrice = selectedProduct ? selectedProduct.price : null;
      setThumbnail(selectedProduct.thumbnail);
      console.log(selectedProduct.thumbnail);
    }
    setEditingItem({
      ...editingItem,
      [id]: value,
      price: updatedPrice
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userResponse = await axios.get("http://localhost:5000/api/users");
      setUserData(userResponse.data);

      const productResponse = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProductData(productResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
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

  const handleSubmit =async (e) => {
    e.preventDefault();
    editingItem.thumbnail = thumbnail;
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/orders`,
            editingItem
          );
          toast.success(response.data, {
            pauseOnHover: false,
          });
          navigate("/order");
        } catch (error) {
          console.error(error.response.data);
          toast.error(error.response.data.error || "Error creating order");
        }
  };
 
  const handleClose = () => {
    navigate("/order");
  };
  return (
    <>
      <div
        className="edit-container"
        style={{ width: toggle ? "65vw" : "70vw" }}
      >
        <div className="form-container">
          <h3>Order</h3>
          <form>
            <div>
              <div className="">
                <select
                  name=""
                  id="productName"
                  onChange={handleChange}
                  value={editingItem.productName}
                >
                  <option value="null">Product name</option>
                  {productData.map((data) => {
                    return (
                      <>
                        <option key={data._id} value={data.title}>
                          {data.title}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <div className="">
                <select
                  name=""
                  id="customerName"
                  onChange={handleChange}
                  value={editingItem.customerName}
                >
                  <option value="null">Customer name</option>
                  {userData.map((data) => {
                    return (
                      <>
                        <option
                          key={data._id}
                          value={data.firstname +" "+ data.lastname}
                        >
                          {data.firstname + " " + data.lastname}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="price"
                  required
                  placeholder=""
                  value={editingItem.price || ""}
                  disabled
                />
                <label htmlFor="price">
                  price(
                  <FaRupeeSign style={{ height: "15px", width: "15px" }} />)
                </label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="quantity"
                  required
                  placeholder=""
                  value={editingItem.quantity || ""}
                  onChange={handleChange}
                />
                <label htmlFor="quantity">quantity</label>
              </div>
            </div>
          </form>
          <div className="btn-container">
            <button onClick={handleClose} type="button" className="close-btn">
              <FaChevronLeft className="icon" />
              Back
            </button>
            <button onClick={handleSubmit}>
              <FaSave className="icon" />
              Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderAdd;
