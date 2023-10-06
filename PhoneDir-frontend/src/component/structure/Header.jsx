import { AppBar, Avatar, Box, Button, Toolbar } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("users");
    localStorage.removeItem("token");
    navigate("/");
  }
  let auth = JSON.parse(localStorage.getItem("users"));
  let toekn = JSON.parse(localStorage.getItem("token"));

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {auth ? (
              <div className="main">
                <Link to={"/addContact"}>
                  <h6 style={{ marginRight: 20, color: "white" }}>
                    Add Contact
                  </h6>
                </Link>

                <Link to={"/addGroup"}>
                  <h6 style={{ marginRight: 20, color: "white" }}>Add Group</h6>
                </Link>
                {/* <Link to={"/deleteGroup"}>
                  <h6 style={{ marginRight: 20, color: "white" }}>
                    Delete Group
                  </h6>
                </Link> */}
                <Link to={"/dashbord"}>
                  <h6 style={{ marginRight: 20, color: "white" }}>Dashbord</h6>
                </Link>

                <Link to={"/"} onClick={logout}>
                  <h6 style={{ marginRight: 20, color: "white" }}>Logout</h6>
                </Link>
                <div className="avatar">
                  <Avatar
                    size="small"
                    edge="start"
                    color="red"
                    aria-label="menu"
                    sx={{ mr: 1, backgroundColor: "darkred" }}
                  >
                    {auth.name[0]}
                  </Avatar>
                  {<h6>{auth.name}</h6>}
                </div>
              </div>
            ) : (
              <div div className="main">
                <Link to={"/"}>
                  <h6 style={{ marginRight: 20, color: "white" }}>Home</h6>
                </Link>
                <Link to={"/login"}>
                  <h6 style={{ marginRight: 20, color: "white" }}>Login</h6>
                </Link>
                <Link to={"/signup"}>
                  <h6 style={{ marginRight: 20, color: "white" }}>SignUp</h6>
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
export default Header;
