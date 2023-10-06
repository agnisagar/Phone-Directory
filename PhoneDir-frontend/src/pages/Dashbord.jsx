import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayOut/MainLayout";
import { useNavigate, Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { Button, TextField, Typography } from "@mui/material";

const Dashbord = () => {
  const [contacts, setContacts] = useState([]);
  var auth = {};
  var token = JSON.parse(localStorage.getItem("token"));
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth = JSON.parse(localStorage.getItem("users"));
    if (!auth) navigate("/login");
    getGroup();
    getContacts();
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

  const getContacts = async () => {
    let temp = JSON.parse(localStorage.getItem("users"))._id;
    console.log(temp);
    let result = await fetch(
      `http://localhost:5000/user/contact/getAllContact/${temp}`,
      {
        headers: { token: token },
      }
    );
    if (result.status == 401) {
      localStorage.removeItem("users");
      localStorage.removeItem("token");
      navigate("/login");
    }
    result = await result.json();

    setContacts(result.result);
  };

  const searchContect = async (e) => {
    auth = JSON.parse(localStorage.getItem("users"));
    if (e.target.value) {
      let result = await fetch(
        `http://localhost:5000/user/contact/searchContact/${e.target.value}/${auth._id}`,
        {
          method: "get",
          headers: { token: token },
        }
      );
      result = await result.json();
      console.log("==", result);
      setContacts(result.result);
    } else {
      getContacts();
    }
  };

  const deleteContact = async (id) => {
    let result = await fetch(
      "http://localhost:5000/user/contact/deleteContact/" + id,
      {
        method: "DELETE",
        headers: { token: token },
      }
    );
    getContacts();
  };

  // console.log("contactsMunu===>", contacts);
  return (
    <>
      <MainLayout />

      <div>
        <Typography variant="h4" sx={{ margin: 2, color: "blue" }}>
          Contact Details{" "}
        </Typography>
        <div className="header-2">
          <select
            className="group"
            id="selectmethod"
            defaultValue=""
            name="group"
            label="Address"
            // {...register("groupId", { required: true })}
            onChange={searchContect}
          >
            <option>Select Group</option>
            {group.map((item, index) => {
              return (
                <>
                  <option value={item._id}>{item.group_name}</option>
                </>
              );
            })}
          </select>

          <TextField
            className="search"
            label="Search Contact"
            type="text"
            onChange={searchContect}
          />
        </div>
        <hr />
        <table class="table table-striped">
          <thead class="table-info">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Address</th>
              <th scope="col">Groups</th>
              <th scope="col">Actoin</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.sort().map((contact, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.contact}</td>
                  <td>{contact.address}</td>
                  <td>{contact.group.group_name}</td>
                  <td>
                    <Link to={`/updateContact/${contact._id}`}>
                      <CreateIcon sx={{ marginRight: 4 }}></CreateIcon>
                    </Link>

                    <DeleteIcon
                      onClick={() => deleteContact(contact._id)}
                    ></DeleteIcon>
                  </td>
                </tr>
              ))
            ) : (
              <h3 className="h3">ooops..!😔😔😔😔😔NOT Contact Found</h3>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashbord;
