import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../context/Order';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';



function UserOrders() {
  const [details, setDetails] = useState();
 
  let { loader, userOrder } = useContext(OrderContext);
  const [loading, setloding] = useState(true);
  const cancel = async (id) => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/order/cancel/${id}`,
      {},
      {
        headers: { Authorization: `Tariq__${token}` },
      }
    );
    window.location.reload();
    if (data.message == "success") {
      toast.success("order canceld successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
   
    
  };
  const getOrderDetails = (order) => {
    setDetails(order);
  };
  return (
    <>
    <div className='bigContent'>
      <div className="user-order row">
        <table className="table col-md-8">
          <thead>
            <tr className="table-dangours">
              <th scope="col">#</th>
              <th scope="col">Order Address</th>
              <th scope="col">Pyment Type</th>
              <th scope="col">Status</th>
              <th scope="col">Final Price</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {userOrder?.orders
              ? userOrder.orders.map((order, index) => (
                  <>
                    <React.Fragment key={index}>
                      <tr>
                        <th>{index}</th>
                        <td>{order.address}</td>
                        <td>{order.paymentType}</td>
                        <td className="status">
                          <mark>{order.status}</mark>
                        </td>
                        <td>{order.finalPrice}</td>
                        <td>{order.phoneNumber}</td>
                        <td>
                          {order.status != "deliverd" &&
                            order.status != "cancelled" && (
                              <a href="#" onClick={() => cancel(order._id)}>
                                <FontAwesomeIcon
                                  icon={faXmark}
                                  className="xMark"
                                />
                              </a>
                            )}
                          <i className='ms-2'>
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              onClick={() => getOrderDetails(order.products)}
                              className="faCircleInfo"
                            />
                          </i>
                        </td>
                      </tr>
                    </React.Fragment>
                  </>
                ))
              : "<h2>no found data</h2>"}
          </tbody>
        </table>
        <div className="orderDetails col-md-4 text-center">
          {details
            ? details.map((detail) => (
                <>
                  <div className="ms-5 mt-3">
                    <img
                      src={detail.productId.mainImage.secure_url}
                      alt=""
                      className="imgDetails"
                    />
                    <p className="text-warning">{detail.productId.name}</p>
                    <p className="text-danger">
                      ${detail.productId.finalPrice} ({detail.quantity})
                    </p>
                  </div>
                </>
              ))
            : "NO details"}
        </div>
      </div>
      </div>
    </>
  );
}

export default UserOrders