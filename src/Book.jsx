import React from "react";
import Navbar from "./components/Navbar.jsx";
import PageFlipBook from "./components/Book.jsx";

export default function Book() {
  return (
    <div className="bg-black h-full">
      <Navbar />
      <div className="pt-24">
        <PageFlipBook />
      </div>
    </div>
  );
}
