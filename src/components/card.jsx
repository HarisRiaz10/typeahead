import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>{children}</div>;
}
