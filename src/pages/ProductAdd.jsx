import React, { useRef } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronLeft, FaRupeeSign, FaSave } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";

function ProductAdd({ toggle }) {
  const fileRef = useRef(null);
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
  const [select, setSelect] = useState("null");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, SetUploadSuccess] = useState(false);
  const [uploadFail, SetUploadFail] = useState(false);
  const [disable, setDisable] = useState(true);
  const [base64, setBase64] = useState({});

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
        if (!validator.isLength(editingItem.stock, { max: 3 })) {
          error = "Maximum stock count 9999";
        }
        if (!validator.isNumeric(editingItem.stock)) {
          error = "Enter numbers only";
        }
        break;
      case "price":
        if (!validator.isLength(editingItem.price, { max: 5 })) {
          error = "Maximum 6 figures";
        }
        if (!validator.isNumeric(editingItem.price)) {
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
    editingItem.category = select;
    editingItem.thumbnail = image
      ? base64
      : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        editingItem
      );
      setLoading(false);
      SetUploadSuccess(false);
      toast.success(response.data, {
        pauseOnHover: false,
      });
      navigate("/product");
    } catch (err) {
      setLoading(false);
      // console.log(err.response.data.error);
      toast.error(err.response.data.error, {
        pauseOnHover: false,
      });
      setServerErr(err.response.data.error);
    }
  };

  const handleClose = () => {
    navigate("/product");
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
        // console.error(error);
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
          <div>
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
                src={URL.createObjectURL(image)}
                alt="product"
              />
            ) : (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer" }}
                src={
                  editingItem.photoURL ||
                  "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                }
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
                  Product Name
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
                  Brand
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
                  onChange={(e) => setSelect(e.target.value)}
                  value={select}
                >
                  <option value="null">- Category -</option>
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
                  type="text"
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
                  Price(
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
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductAdd;
