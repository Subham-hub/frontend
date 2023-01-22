import { Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "../../shared/UIElements/Card/Card";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import MyModal from "../../shared/UIElements/Modal/Modal";
import { useHttp } from "../../shared/hooks/http-hook";
import { userDataActions } from "../../shared/store/userDataSlice";
import { authActions } from "../../shared/store/authSlice";

import classes from "./css/Auth.module.css";

const Auth = ({ inValidAccess }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { handleSubmit, register } = useForm();
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let response;
    if (isLoggingIn) {
      try {
        response = await sendRequest("auth", "POST", {
          ...data,
          mode: "login",
        });
        dispatch(authActions.login(response.user.role));
        dispatch(
          userDataActions.setData({
            role: response.user.role,
            uid: response.user._id,
            token: response.token,
          })
        );
        if (response.user.role === "user") navigate("/server-verification");
        else navigate("/t0SHFA0pHFKayedfQaqy/admin");
      } catch (e) {
        throw new Error("Somthing went wrong, please refresh and try again!");
      }
    } else {
      try {
        response = await sendRequest("auth", "POST", {
          ...data,
          mode: "signup",
        });
        dispatch(authActions.login(response.user.role));
        dispatch(
          userDataActions.setData({
            uid: response.user._id,
            token: response.token,
          })
        );
        navigate("/service-agreement");
      } catch (e) {
        throw new Error("Somthing went wrong, please refresh and try again!");
      }
    }
  };

  useEffect(() => {
    inValidAccess && handleOpen();
  }, [inValidAccess]);

  return (
    <>
      {
        <MyModal
          open={error ? true : false}
          handleClose={clearError}
          modalDescription={error}
        />
      }
      {
        <MyModal
          open={open}
          handleClose={handleClose}
          modalText="Not logged In!"
          modalDescription={
            "Either you are not logged-In or this page doesn't exists!"
          }
        />
      }
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className={`${classes.content} center`}>
          <Card className={classes.inner}>
            <div className={classes.header}>
              <h1>{isLoggingIn ? "LOG-IN" : "REGISTER"}</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {isLoggingIn && (
                <>
                  <label>Enter Login-Id</label>
                  <br />
                  <Input
                    {...register("login_id", {
                      required: {
                        value: true,
                        message: "Login-Id Is required!",
                      },
                    })}
                  />
                  <br />
                </>
              )}
              {!isLoggingIn && (
                <>
                  <label>Enter Name</label>
                  <br />
                  <Input
                    {...register("name", {
                      required: { value: true, message: "Name Is required!" },
                    })}
                  />
                  <br />
                </>
              )}
              <label>Enter Email</label>
              <br />
              <Input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Empty Fields!",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please Enter an valid email!",
                  },
                })}
              />
              <br />
              <label>Enter Password</label>
              <br />
              <Input
                {...register("password", {
                  required: { value: true, message: "Name Is required!" },
                  minLength: { value: true, message: "Password must be <6" },
                })}
                type="password"
              />
              <p>
                <Link
                  onClick={() => {
                    if (isLoggingIn) {
                      setIsLoggingIn(false);
                    } else {
                      setIsLoggingIn(true);
                    }
                  }}
                  to="#"
                >
                  Click here
                </Link>{" "}
                to {!isLoggingIn ? "login" : "register"}
              </p>
              <br />
              <Button type="submit" variant="contained">
                {isLoggingIn ? "Login" : "Register"}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default Auth;
