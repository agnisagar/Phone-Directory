import React from "react";
import MainLayout from "../Layouts/MainLayOut/MainLayout";
import { Typography } from "@mui/material";

function PageNotFound() {
  return (
    <div>
      <MainLayout>
        <Typography variant="h2" style={{ margin: 20 }}>
          404, Page Not Found...!
        </Typography>{" "}
      </MainLayout>
    </div>
  );
}

export default PageNotFound;
