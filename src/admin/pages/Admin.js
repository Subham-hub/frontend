import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import UserIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../../shared/UIElements/Card/Card";
import NavBar from "../components/NavBar";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import Modal from "../../shared/UIElements/Modal/Modal";
import { useHttp } from "../../shared/hooks/http-hook";

import classes from "./css/Admin.module.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [otherUid, setOtherUid] = useState();
  const { token } = useSelector((s) => s.userData);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDetailsModal = () => setOpenDetailsModal(true);
  const handleCloseDetailsModal = () => setOpenDetailsModal(false);
  const { sendRequest, error, isLoading, clearError } = useHttp();

  const deleteUserHandler = async () => {
    setOpenDeleteModal(false);
    await sendRequest(
      "admin_update_user",
      "PUT",
      {
        mode: "delete",
        uid: otherUid,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    alert("Deleted successfully!");
  };

  useEffect(() => {
    (async () => {
      const users = await sendRequest("admin_users", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUsers(users.users.filter((user) => user.role !== "admin"));
    })();
  }, [sendRequest, token]);
  let sessionDetailsUser;
  if (users.length !== 0)
    sessionDetailsUser = users.find((user) => user._id === otherUid);

  return (
    <>
      <NavBar />
      <Modal
        open={error ? true : false}
        handleClose={clearError}
        modalDescription={error}
      />

      <Modal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        modalText="Are you  you want to delete this user?"
        modalDescription={
          <>
            <Button
              onClick={deleteUserHandler}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
            <span style={{ visibility: "hidden" }}>......</span>
            <Button
              onClick={handleCloseDeleteModal}
              variant="contained"
              color="success"
            >
              Cancel
            </Button>
          </>
        }
      />

      <Modal
        open={openDetailsModal}
        handleClose={handleCloseDetailsModal}
        modalText="Session Details"
        modalDescription={
          sessionDetailsUser && (
            <>
              <h3>
                <b>User Id:</b> {sessionDetailsUser._id}
              </h3>
              <h3>
                <b>Name:</b> {sessionDetailsUser.name}
              </h3>
              <h3>
                <b>Email:</b> {sessionDetailsUser.email}
              </h3>
              {sessionDetailsUser.sessions && (
                <h3>
                  <b>Total Sessions Attempted:</b> (
                  {sessionDetailsUser.sessions.length})
                  <p style={{ backgroundColor: "white", color: "black" }}>
                    {sessionDetailsUser.sessions.map((session) => (
                      <span key={session._id}>
                        ({sessionDetailsUser.sessions.indexOf(session) + 1}
                        )Session- {session.forms.length} Form(s)
                        <br />
                        <hr
                          style={{ height: "10px", backgroundColor: "black" }}
                        />
                      </span>
                    ))}
                  </p>
                </h3>
              )}
            </>
          )
        }
      />

      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className={`${classes.content} center`}>
          <Card style={{ backgroundColor: "white" }} className={classes.inner}>
            {users.length !== 0 && (
              <ol>
                {users.map((user) => (
                  <li key={user._id}>
                    <h1>
                      Name: {user.name}
                      {"   "}
                      <UserIcon />
                    </h1>
                    <h3>Email: {user.email}</h3>
                    {user.role === "user" && (
                      <div className={classes.btn}>
                        <Link
                          to={`/t0SHFA0pHFKayedfQaqy/user-agreements/${user._id}`}
                        >
                          <Button color="secondary" variant="contained">
                            Agreements
                          </Button>
                        </Link>
                        <span>......</span>

                        <Button
                          color="warning"
                          variant="contained"
                          onClick={() => {
                            handleOpenDetailsModal();
                            setOtherUid(user._id);
                          }}
                        >
                          Sessions Details
                        </Button>
                        <span>......</span>
                        <Link
                          to={`/t0SHFA0pHFKayedfQaqy/admin_update_user/${user._id}`}
                        >
                          <Button variant="contained">Update</Button>
                        </Link>
                        <span>......</span>
                        <Button
                          onClick={() => {
                            handleOpenDeleteModal();
                            setOtherUid(user._id);
                          }}
                          variant="outlined"
                          color="error"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                    <hr />
                  </li>
                ))}
              </ol>
            )}
            {users.length === 0 && <p>No users found!</p>}
          </Card>
        </div>
      )}
    </>
  );
};

export default Admin;
