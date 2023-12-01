import React from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import validator from "validator";

export default function CustomerAdd({ toggle }) {
  const fileRef = useRef(null);
  const [editingItem, setEditingItem] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });
  const [select, setSelect] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, SetUploadSuccess] = useState(false);
  const [uploadFail, SetUploadFail] = useState(false);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const [base64, setBase64] = useState({});

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
      editingItem.firstname === "" ||
      editingItem.lastname === "" ||
      editingItem.mobile === "" ||
      editingItem.email === ""
    ) {
      setDisable(true);
    } else if (
      errors.firstname !== "" ||
      errors.lastname !== "" ||
      errors.mobile !== "" ||
      errors.email !== ""
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
      case "firstname":
        if (!validator.isLength(editingItem.firstname, { min: 4, max: 12 })) {
          error = "Should be 4 to 12 characters";
        }
        break;
      case "lastname":
        if (!validator.isLength(editingItem.lastname, { min: 4, max: 12 })) {
          error = "Should be 4 to 12 characters";
        }
        break;
      case "email":
        if (!validator.isEmail(editingItem.email)) {
          error = "Email is not valid";
        }
        break;
      case "mobile":
        if (editingItem.mobile.length !== 9) {
          error = "Must be 10 digits";
        }
        if (!validator.isNumeric(editingItem.mobile)) {
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
    editingItem.membership = select;
    editingItem.photoURL = image
      ? base64
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAUvIj8tIlcc6MemlkLaXGlOLNplzf-3euA&usqp=CAU";
    // console.log(editingItem);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users`,
        editingItem
      );
      setLoading(false);
      SetUploadSuccess(false);
      toast.success(response.data, {
        pauseOnHover: false,
      });
      navigate("/customer");
    } catch (error) {
      setLoading(false);
      // console.error(error);
      if (error.response) {
        // console.error(error.response.data);
        // console.error(error.response.status);
        setServerErr(error.response.data.error);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const handleClose = () => {
    navigate("/customer");
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
  // console.log(image);
  return (
    <>
      <div
        className="edit-container"
        style={{ width: toggle ? "65vw" : "70vw" }}
      >
        <div className="form-container">
          <h3>Customer</h3>
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
                src={URL.createObjectURL(image)}
                alt="avatar"
              />
            ) : (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer" }}
                src={
                  editingItem.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAUvIj8tIlcc6MemlkLaXGlOLNplzf-3euA&usqp=CAU"
                }
                alt="avatar"
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
              alignSelf: "flex-start",
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
                style={{ border: errors.firstname ? "1px solid red" : "" }}
              >
                <input
                  type="text"
                  id="firstname"
                  required
                  placeholder=""
                  value={editingItem.firstname}
                  onChange={handleChange}
                />
                <label
                  htmlFor="firstname"
                  style={{ color: errors.firstname ? "red" : "" }}
                >
                  Firstname
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
                  {errors.firstname}
                </small>
              </div>
            </div>
            <div>
              <div
                className="input-box"
                style={{ border: errors.lastname ? "1px solid red" : "" }}
              >
                <input
                  type="text"
                  id="lastname"
                  required
                  placeholder=""
                  value={editingItem.lastname}
                  onChange={handleChange}
                />
                <label
                  htmlFor="lastname"
                  style={{ color: errors.lastname ? "red" : "" }}
                >
                  Lastname
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
                  {errors.lastname}
                </small>
              </div>
            </div>
            <div>
              <div
                className="input-box"
                style={{ border: errors.email && "1px solid red" }}
              >
                <input
                  type="email"
                  id="email"
                  required
                  placeholder=""
                  value={editingItem.email}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  style={{ color: errors.email ? "red" : "" }}
                >
                  Email
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
                  {errors.email}
                </small>
              </div>
            </div>
            <div>
              <div
                className="input-box"
                style={{ border: errors.mobile ? "1px solid red" : "" }}
              >
                <input
                  type="text"
                  id="mobile"
                  required
                  placeholder=""
                  value={editingItem.mobile}
                  onChange={handleChange}
                />
                <label
                  htmlFor="mobile"
                  style={{ color: errors.mobile ? "red" : "" }}
                >
                  mobile
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
                  {errors.mobile}
                </small>
              </div>
            </div>
            <div>
              <div className="">
                <select
                  name=""
                  id="membership"
                  onChange={(e) => setSelect(e.target.value)}
                  value={select}
                >
                  <option className="option" value="true">
                    Member
                  </option>
                  <option className="option" value="false">
                    Not a Member
                  </option>
                </select>
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
