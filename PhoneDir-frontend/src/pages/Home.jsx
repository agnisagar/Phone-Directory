import React from "react";
import MainLayout from "../Layouts/MainLayOut/MainLayout";
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <MainLayout>
      <Typography variant="h1" style={{ margin: 20 }}>
        Hello This Is Home Page...!
      </Typography>
    </MainLayout>
  );
};
export default Home;
