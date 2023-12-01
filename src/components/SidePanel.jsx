import "../Styles/SidePanel.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaChevronLeft,
  FaInfoCircle,
  FaStoreAlt,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping, FaGithub } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import { isAuthenticated } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SidePanel({ toggle, setToggle }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMenuClose = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    toast.info("Admin Logout Successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
    });
    // dispatch(setSuccess(""))
    dispatch(isAuthenticated(false));
    navigate("/signin");
  };


  return (
    <div className="container">
      <div className="side-panel" style={{ width: toggle ? "6vw" : "16vw" }}>
        <div>
          <div className="user" style={{ width: toggle ? "6vw" : "16vw" }}>
            <div className={toggle ? "img" : "img1"}>
              <img src="images/logo.png" alt="profile" />
            </div>
          </div>
        </div>
        <div
          className="link-container"
          style={{ height: toggle ? "auto" : "0" }}
        >
          <div className="link-content">
            <ul>
              <Link to={"/"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaChartLine className="icon" />
                    <span className="tooltip">Dashboard</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaChartLine className="icon" />
                    </div>
                    <li>
                      <span>DashBoard</span>
                    </li>
                  </>
                )}
              </Link>

              <Link to={"/customer"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaUser className="icon" />
                    <span className="tooltip">Customer</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaUser className="icon" />
                    </div>
                    <li>
                      <span>Customer</span>
                    </li>
                  </>
                )}
              </Link>
              <Link to={"/order"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaCartShopping className="icon" />
                    <span className="tooltip">Order</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaCartShopping className="icon" />
                    </div>
                    <li>
                      <span>Order</span>
                    </li>
                  </>
                )}
              </Link>
              <Link to={"/product"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaStoreAlt className="icon" />
                    <span className="tooltip">Product</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaStoreAlt className="icon" />
                    </div>
                    <li>
                      <span>Product</span>
                    </li>
                  </>
                )}
              </Link>
              <Link to={"/about"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaInfoCircle className="icon" />
                    <span className="tooltip">About</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaInfoCircle className="icon" />
                    </div>
                    <li>About</li>
                  </>
                )}
              </Link>
              <Link
                onClick={handleLogout}
                className={toggle ? "close" : "open"}
              >
                {toggle ? (
                  <div>
                    <CgLogOut className="icon" style={{ fontSize: "25px" }} />
                    <span className="tooltip">Signout</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <CgLogOut className="icon" style={{ fontSize: "25px" }} />
                    </div>
                    <li>Signout</li>
                  </>
                )}
              </Link>
            </ul>
          </div>
          <div className="collapse">
            <button onClick={handleMenuClose}>
              <FaChevronLeft
                className="icon icon-right"
                style={{
                  rotate: toggle ? "180deg" : "0deg",
                  transition: ".2s",
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="pages" style={{ width: toggle ? "100%" : "90%" }}>
        <nav>
          <h4>
            {location.pathname === "/"
              ? "DashBoard"
              : location.pathname.slice(1)}
          </h4>
          <div>
            <a
              href="https://github.com/Muruganmuthukumar/CustomerApp"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="icon" />
            </a>
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
