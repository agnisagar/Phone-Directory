import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PageNotFound from "../pages/PageNotFound";

import LogOut from "../pages/LogOut";
import Dashbord from "../pages/Dashbord";
import AddContact from "../pages/AddContact";
import UpdateContact from "../pages/UpdateContect";

import Home from "../pages/Home";
import AddGroup from "../pages/AddGroup";

export const AllRouting = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/addContact" element={<AddContact />} />
        <Route path="/addGroup" element={<AddGroup />} />
        {/* <Route path="/deleteGroup" element={<DeleteGroup />} /> */}
        <Route path="/updateContact/:id" element={<UpdateContact />} />
        <Route path="/dashbord" element={<Dashbord />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
