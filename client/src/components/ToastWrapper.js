// ToastContainerWrapper.js
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './toastStyles.css'; // Custom styles

const ToastWrapper = () => (
  <ToastContainer
    className="custom-toast-container"
    toastClassName="custom-toast-message"
    progressClassName="custom-toast-progress-bar"
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default ToastWrapper;
