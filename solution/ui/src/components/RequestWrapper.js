import React from "react";
import { ImSpinner6 } from "react-icons/im";

function RequestWrapper({  isLoading, children }) {
  if (isLoading) return <ImSpinner6 data-testid="loader" />;
  return children;
}

export default RequestWrapper;
