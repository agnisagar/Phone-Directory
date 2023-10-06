import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayOut/MainLayout";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddGroup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const navigate = useNavigate();

  var token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    var auth = JSON.parse(localStorage.getItem("users"));
    if (!auth) navigate("/login");
  }, []);

  const AddGroup = async (value) => {
    let userId = JSON.parse(localStorage.getItem("users"))._id;
    value.userId = userId;
    let result = await fetch("http://localhost:5000/user/group", {
      method: "POST",
      body: JSON.stringify(value),
      headers: { "Content-Type": "application/json", token: token },
    });
    // console.log(value);
    result = await result.json();
    if (result.status === 200) {
      navigate("/dashbord");
    }

    reset();
  };
  return (
    <>
      <MainLayout />

      <form className="add-contact" onSubmit={handleSubmit(AddGroup)}>
        <Typography variant="h4" style={{ margin: 5 }}>
          Add Groups
        </Typography>

        <TextField
          className="w-100 mb-3"
          style={{ margin: 10 }}
          label="Add Groups"
          {...register("group_name", {
            required: {
              value: true,
              message: "Group is Required",
            },
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Invalid Group",
            },
          })}
          error={!!errors.groups}
          helperText={errors?.groups?.message}
        />

        <Button size="large" variant="contained" color="primary" type="submit">
          Add Group
        </Button>
      </form>
    </>
  );
};

export default AddGroup;
