import React from "react";
import {
  FaCheckCircle,
  FaTrash,
  FaPen,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import ReactPaginate from "react-paginate";

function Table({
  list,
  listType,
  handleEdit,
  currentItems,
  setDeletingId,
  setShow,
  show,
  pageCount,
  handlePageClick,
  searchItem,
}) {
  return (
    <>
      {searchItem && list.length === 0 && (
        <h4 className="exception">no search result for "{searchItem}"</h4>
      )}
      {list.length === 0 ? (
        <h4 className="exception">List is Empty!</h4>
      ) : (
        <>
          <div>
            <table>
              <thead>
                {listType === "customer" && (
                  <tr>
                    <th>Avatar</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Membership</th>
                    <th>Actions</th>
                  </tr>
                )}
                {listType === "product" && (
                  <tr>
                    <th>Product</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>
                      Price&nbsp;(
                      <FaRupeeSign style={{ height: "12px", width: "12px" }} />)
                    </th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                )}
                {listType === "order" && (
                  <tr>
                    <th>Product</th>
                    <th>
                      Product Price(
                      <FaRupeeSign style={{ height: "12px", width: "12px" }} />)
                    </th>
                    <th>Product Name</th>
                    <th>Customer Name</th>
                    <th>Quantity</th>
                    <th>
                      Grand Total(
                      <FaRupeeSign style={{ height: "12px", width: "12px" }} />)
                    </th>
                    {/* <th>Actions</th> */}
                    <th>Order Status</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((data) => {
                    return (
                      <tr key={data._id}>
                        {listType === "customer" && (
                          <>
                            <td>
                              <img src={data.photoURL} alt="avatar" />
                            </td>
                            <td>{data.firstname}</td>
                            <td>{data.lastname}</td>
                            <td>{data.email}</td>
                            <td>{data.mobile}</td>
                            <td>
                              {data.membership ? (
                                <FaCheckCircle className="member-icon" />
                              ) : (
                                <FaCircleXmark className="member-icon" />
                              )}
                            </td>
                          </>
                        )}
                        {listType === "product" && (
                          <>
                            <td>
                              <img src={data.thumbnail} alt="product" />
                            </td>
                            <td style={{ maxWidth: "150px" }}>{data.title}</td>
                            <td>{data.brand}</td>
                            <td>{data.category}</td>
                            <td>{data.price}</td>
                            <td>{data.stock}</td>
                          </>
                        )}
                        {listType === "order" && (
                          <>
                            <td>
                              <img src={data.thumbnail} alt="product" />
                            </td>
                            <td style={{ paddingLeft: "50px" }}>
                              {data.price}
                            </td>
                            <td style={{ maxWidth: "100px" }}>
                              {data.productName}
                            </td>
                            <td>{data.customerName}</td>
                            <td>
                              {data.quantity}
                              <span style={{ fontSize: "12px" }}>x</span>
                            </td>
                            <td>{data.price * data.quantity}</td>
                            <td className="success">Success</td>
                          </>
                        )}
                        {listType !== "order" && (
                          <td>
                            <button onClick={() => handleEdit(data)}>
                              <FaPen className="edit-icon icon" />
                              <span className="tooltip">Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                setDeletingId(data._id);
                                setShow(!show);
                              }}
                            >
                              <FaTrash className="delete-icon icon" />
                              <span className="tooltip">Delete</span>
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={<FaChevronLeft className="prev-icon" />}
              nextLabel={<FaChevronRight className="next-icon" />}
              containerClassName={"pagination-container"}
              previousClassName={"prev-label"}
              nextClassName={"next-label"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Table;
