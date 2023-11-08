import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ loggedIn, children }) => {
	if (!loggedIn) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export default ProtectedRouteElement;
