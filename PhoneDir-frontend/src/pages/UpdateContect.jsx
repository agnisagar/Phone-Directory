import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayOut/MainLayout";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  TextField,
  LinearProgress,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateContact = () => {
  const {
    register,
    handleSubmit,
    reset,

    setValue,
    formState: { errors },
  } = useForm({});
  const [group, setGroup] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  var token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    var auth = JSON.parse(localStorage.getItem("users"));
    if (!auth) navigate("/login");
    getContact();
    getGroup();
  }, [id]);

  const getGroup = async () => {
    let userId = JSON.parse(localStorage.getItem("users"))._id;
    let result = [];
    fetch(`http://localhost:5000/user/group/getAllGroup/${userId}`).then(
      (result) => {
        result.json().then((result) => {
          setGroup(result.result);
        });
      }
    );
    if (result.status == 200) {
      localStorage.removeItem("users");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  const updateContect = async (value) => {
    console.log("update", value);
    let result = await fetch(
      `http://localhost:5000/user/contact/updateContact/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(value),
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    result = await result.json();
    if (result.status == 200) {
      navigate("/dashbord");
    }
  };

  const getContact = async () => {
    // console.log("result==>", id);
    let result = await fetch(
      `http://localhost:5000/user/contact/getContact/${id}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    );
    result = await result.json();
    // console.log("====update>", result.result[0].name);
    if (result.result) {
      setValue("name", result.result[0].name);
      setValue("email", result.result[0].email);
      setValue("contact", result.result[0].contact);
      setValue("address", result.result[0].address);
      // setValue("groupId", result.data[0].group[0].groups);
    }
  };

  return (
    <>
      <MainLayout />

      <form className="add-contact" onSubmit={handleSubmit(updateContect)}>
        <Typography variant="h4" style={{ margin: 5 }}>
          Update Contact
        </Typography>

        {/* {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )} */}
        <TextField
          className="w-100 mb-10"
          style={{ margin: 7 }}
          {...register("name", {
            required: {
              value: true,
              message: "Name is Required",
            },
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Invalid Name",
            },
          })}
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <TextField
          className="w-100 mb-8"
          style={{ margin: 7 }}
          {...register("email", {
            required: {
              value: true,
              message: "Email is Required",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid Email",
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField
          className="w-100 mb-8"
          style={{ margin: 7 }}
          {...register("contact", {
            required: {
              value: true,
              message: "contact is Required",
            },
            pattern: {
              value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
              message: "Invalid contact",
            },
          })}
          error={!!errors.contact}
          helperText={errors?.contact?.message}
        />
        <TextField
          className="w-100 mb-8"
          style={{ margin: 7 }}
          {...register("address", {
            required: {
              value: true,
              message: "Address is Required",
            },
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Invalid address",
            },
          })}
          error={!!errors.address}
          helperText={errors?.address?.message}
        />

        <select
          className="form-control  input-box m-2"
          id="selectmethod"
          defaultValue=""
          name="group"
          {...register("groupId", { required: true })}
        >
          {group.map((item, index) => {
            return <option value={item._id}>{item.group_name}</option>;
          })}
        </select>
        <Button size="large" variant="contained" color="success" type="submit">
          update
        </Button>
      </form>
    </>
  );
};

export default UpdateContact;
//   http://localhost:5000/updateContact/:id
//   http://localhost:5000/getContactById/:
