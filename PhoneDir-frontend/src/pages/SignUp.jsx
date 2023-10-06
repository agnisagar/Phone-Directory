import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayOut/MainLayout";
import { useForm } from "react-hook-form";
import { TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();
  const [pass_error, setPassError] = useState("");

  const onSubmit = async (value) => {
    let result = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      body: JSON.stringify(value),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();

    if (result.status == 200) {
      navigate("/login");
    } else {
      setPassError(result.msg);
    }
    // reset();
  };
  return (
    <div>
      <MainLayout>
        {pass_error !== "" ? <h4 className="msg">{pass_error}</h4> : ""}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" style={{ margin: 5 }}>
            sign up
          </Typography>
          <TextField
            className="w-100 mb-3"
            style={{ margin: 10 }}
            label=" Name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
              pattern: {
                value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                message: "Invalid Name",
              },
            })}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <TextField
            className="w-100 mb-3"
            style={{ margin: 10 }}
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
            className="w-100 mb-3"
            style={{ margin: 10 }}
            label="Password"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "password is Required",
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
          <div
            className="d-flex gap-5 justify-content-center"
            style={{ margin: 5 }}
          >
            {/* <Button
              variant="contained"
              color="error"
              type="button"
              onClick={handleClose}
              style={{ margin: 10 }}
            >
              Cancel
            </Button> */}
            <Button variant="contained" color="success" type="submit">
              Sign in
            </Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}

export default SignUp;
