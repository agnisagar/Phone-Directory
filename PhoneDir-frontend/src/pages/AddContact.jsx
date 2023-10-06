import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayOut/MainLayout";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Button,
  TextField,
  LinearProgress,
  Typography,
  Box,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [group, setGroup] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  var token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    var auth = JSON.parse(localStorage.getItem("users"));
    if (!auth) navigate("/login");
    getGroup();
  }, []);

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
  // console.log("===group===", group);
  const onSubmit = async (value) => {
    setLoading(true);
    // console.log("value", value);
    let userId = JSON.parse(localStorage.getItem("users"))._id;

    value.userId = userId;
    let result = await fetch("http://localhost:5000/user/contact", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    if (result.status === 200) {
      navigate("/dashbord");
    }
    console.log("value==>", value);
    setLoading(false);
    reset();
  };
  const deleteGroup = async (id) => {
    console.log("issss", id);
    let result = await fetch(
      "http://localhost:5000/user/group/deleteGroup/" + id,
      {
        method: "DELETE",
        headers: { token: token },
      }
    );
    getGroup();
  };
  return (
    <>
      <MainLayout />

      <form className="add-contact" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" style={{ margin: 5 }}>
          Add Contact
        </Typography>

        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <TextField
          className="w-100 mb-10"
          style={{ margin: 7 }}
          label=" Name"
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
          label=" Email"
          type="email"
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
          label=" Contact"
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
          label="Address"
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
            return (
              <option value={item._id} key={index}>
                <h2> {item.group_name}</h2>

                {/* {
                  <div style={{ border: 1 }}>
                    <Button
                      sx={{ border: 1, borderColor: "red" }}
                      onClick={() => deleteGroup(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                } */}
              </option>
            );
          })}
        </select>
        <Button size="large" variant="contained" color="success" type="submit">
          Add
        </Button>
      </form>
    </>
  );
};

export default AddContact;
