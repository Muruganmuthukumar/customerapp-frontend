import React, { useEffect } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_Product } from "../redux/product/productSlice";
import { useRef } from "react";
import { FaChevronLeft, FaRupeeSign, FaSave } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";

function ProductEdit({ toggle }) {
  const fileRef = useRef(null);
  const { editingProduct } = useSelector((state) => state.product);
  const [editingItem, setEditingItem] = useState({
    title: "",
    brand: "",
    stock: "",
    price: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    brand: "",
    stock: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, SetUploadSuccess] = useState(false);
  const [uploadFail, SetUploadFail] = useState(false);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setEditingItem((prev) => ({ ...prev, ...editingProduct }));
  }, [editingProduct]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({
      ...editingItem,
      [id]: value,
    });
    handleValidate(id);
  };

  useEffect(() => {
    if (
      editingItem.title === "" ||
      editingItem.brand === "" ||
      editingItem.stock === "" ||
      editingItem.price === ""
    ) {
      setDisable(true);
    } else if (
      errors.title !== "" ||
      errors.brand !== "" ||
      errors.stock !== "" ||
      errors.price !== ""
    ) {
      setDisable(true);
    } else if (loading && serverErr === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
    // eslint-disable-next-line
  }, [handleChange]);

  useEffect(() => {
    fetchByProductId();
    // eslint-disable-next-line
  }, []);

  const fetchByProductId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/${editingProduct._id}`
      );
      setEditingItem(response.data);
    } catch (error) {
      console.error("Error fetching product by ID:", error.message);
      if (error.response) {
        console.error(error.response.data);
        toast.error(error.response.data.error || "Error fetching product");
      } else if (error.request) {
        console.error(error.request);
        toast.error("Error fetching product");
      } else {
        console.error("Error", error.message);
        toast.error("Error fetching product");
      }
    }
  };

  const handleValidate = (inputValue) => {
    let error = "";
    switch (inputValue) {
      case "title":
        if (!validator.isLength(editingItem.title, { max: 40 })) {
          error = "Maximum 40 characters";
        }
        break;
      case "brand":
        if (!validator.isLength(editingItem.brand, { max: 20 })) {
          error = "Maximum 20 characters";
        }
        break;
      case "stock":
        if (!validator.isLength(String(editingItem.stock), { max: 3 })) {
          error = "Maximum stock count 9999";
        }
        if (!validator.isNumeric(String(editingItem.stock))) {
          error = "Enter numbers only";
        }
        break;
      case "price":
        if (!validator.isLength(String(editingItem.price), { max: 5 })) {
          error = "Maximum 6 figures";
        }
        if (!validator.isNumeric(String(editingItem.price))) {
          error = "Enter numbers only";
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [inputValue]: error });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerErr("");
    editingItem.thumbnail = image ? base64 : editingItem.thumbnail;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/products/${editingProduct._id}`,
        editingItem
      );
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setLoading(false);
        SetUploadSuccess(false);
        toast.success("Product updated successfully");
        navigate("/product");
      }
    } catch (err) {
      setLoading(false);
      // console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        // toast.error(err.response.data.error);
        setServerErr(err.response.data.error);
      } else {
        toast.error("Error updating product");
      }
    }
  };

  const handleClose = () => {
    navigate("/product");
    dispatch(edit_Product(null));
  };

  const handleImage = async (e) => {
    SetUploadSuccess(false);
    SetUploadFail(false);
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/avif",
      ];
      try {
        if (allowedTypes.includes(file.type)) {
          setUploading(true);
          const base64String = await convertImageToBase64(file);
          setImage(file);
          setBase64(base64String);
          setUploading(false);
          SetUploadSuccess(true);
          // toast.info("Image Uploaded Successfully");
        } else {
          SetUploadSuccess(false);
          SetUploadFail(true);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error uploading image");
      }
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <div
        className="edit-container"
        style={{ width: toggle ? "65vw" : "70vw" }}
      >
        <div className="form-container">
          <h3>Product</h3>
          <div className="img-container">
            <input
              hidden
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
            {image ? (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer", alignSelf: "flex-start" }}
                src={URL.createObjectURL(image)}
                alt="product"
              />
            ) : (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer" }}
                src={editingItem.thumbnail}
                alt="product"
              />
            )}
          </div>
          <small
            style={{
              color: uploading
                ? "blueviolet"
                : uploadSuccess
                ? "green"
                : uploadFail
                ? "red"
                : "",
              alignSelf: "center",
              marginLeft: "20px",
              marginTop: "10px",
              fontWeight: "600",
            }}
          >
            {uploading
              ? "Uploading..."
              : uploadSuccess
              ? "Image Uploaded Successfully"
              : uploadFail
              ? "Please upload a valid image file (JPEG, PNG, GIF, WEbP, AVIF)."
              : ""}
          </small>
          <form>
            <div>
              <div
                className="input-box"
                style={{ border: errors.title ? "1px solid red" : "" }}
              >
                <input
                  type="text"
                  id="title"
                  required
                  placeholder=""
                  value={editingItem.title}
                  onChange={handleChange}
                />
                <label
                  htmlFor="title"
                  style={{ color: errors.title ? "red" : "" }}
                >
                  productname
                </label>
                <small
                  style={{
                    color: "red",
                    fontWeight: "600",
                    position: "absolute",
                    bottom: "-25px",
                    left: "0",
                  }}
                >
                  {errors.title}
                </small>
              </div>
            </div>
            <div>
              <div
                className="input-box"
                style={{ border: errors.brand ? "1px solid red" : "" }}
              >
                <input
                  type="text"
                  id="brand"
                  required
                  placeholder=""
                  value={editingItem.brand}
                  onChange={handleChange}
                />
                <label
                  htmlFor="brand"
                  style={{ color: errors.brand ? "red" : "" }}
                >
                  brand
                </label>
                <small
                  style={{
                    color: "red",
                    fontWeight: "600",
                    position: "absolute",
                    bottom: "-25px",
                    left: "0",
                  }}
                >
                  {errors.brand}
                </small>
              </div>
            </div>
            <div>
              <div className="">
                <select
                  name=""
                  id="category"
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, category: e.target.value })
                  }
                  value={editingItem.category}
                >
                  <option defaultChecked={true}>- Category -</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="laptops">Laptops</option>
                  <option value="fragrances">Fragrances</option>
                  <option value="skincare">Skincare</option>
                  <option value="groceries">Groceries</option>
                  <option value="home-decoration">Home-decoration</option>
                </select>
              </div>
            </div>
            <div>
              <div
                className="input-box"
                style={{ border: errors.stock ? "1px solid red" : "" }}
              >
                <input
                  type="text"
                  id="stock"
                  required
                  placeholder=""
                  value={editingItem.stock}
                  onChange={handleChange}
                />
                <label
                  htmlFor="stock"
                  style={{ color: errors.stock ? "red" : "" }}
                >
                  Stock
                </label>
                <small
                  style={{
                    color: "red",
                    fontWeight: "600",
                    position: "absolute",
                    bottom: "-25px",
                    left: "0",
                  }}
                >
                  {errors.stock}
                </small>
              </div>
            </div>
            <div>
              <div
                className="input-box"
                style={{ border: errors.price ? "1px solid red" : "" }}
              >
                <input
                  type="price"
                  id="price"
                  required
                  placeholder=""
                  value={editingItem.price}
                  onChange={handleChange}
                />
                <label
                  htmlFor="price"
                  style={{ color: errors.price ? "red" : "" }}
                >
                  price(
                  <FaRupeeSign style={{ height: "13px", width: "13px" }} />)
                </label>
                <small
                  style={{
                    color: "red",
                    fontWeight: "600",
                    position: "absolute",
                    bottom: "-25px",
                    left: "0",
                  }}
                >
                  {errors.price}
                </small>
              </div>
            </div>
          </form>
          <small
            style={{
              position: "relative",
              marginBottom: "20px",
              marginTop: "-20px",
              fontWeight:"600",
              color: serverErr === "" ? "blueviolet" : "red",
            }}
          >
            {loading && serverErr === "" && "Please wait..."}
            {!loading && serverErr !== "" && serverErr}
          </small>
          <div className="btn-container">
            <button onClick={handleClose} className="close-btn">
              <FaChevronLeft className="icon" />
              Back
            </button>
            <button onClick={handleSubmit} disabled={disable}>
              <FaSave className="icon" />
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductEdit;
