import React, { Fragment, useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../shared/UIElements/Card/Card";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import Modal from "../../shared/UIElements/Modal/Modal";
import { useHttp } from "../../shared/hooks/http-hook";
import { fields } from "../../shared/util/fields";
import { authActions } from "../../shared/store/authSlice";

import classes from "./css/Form.module.css";
import logo from "../../assets/logo.jpg";

const Form = () => {
  const [open, setOpen] = useState(false);
  const [errorFields, seterrorFields] = useState();
  const [totalForms, setTotalForms] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const { uid, sid, token } = useSelector((s) => s.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, isSubmitSuccessful, isValid },
    reset,
    getValues,
  } = useForm();
  const { sendRequest, isLoading, error, clearError } = useHttp();

  const onSubmit = async (data) => {
    const response = await sendRequest(
      "submit_form",
      "POST",
      {
        ...data,
        uid,
        sid,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const current_session =
      response.user.sessions[response.user.sessions.length - 1];
    setTotalForms(current_session.forms.length);
    setSessionCount(response.user.sessions.length);
  };

  useEffect(() => {
    if (!isValid && isSubmitted) {
      const fields = getValues();
      for (let field in fields) {
        if (fields[field] === "") seterrorFields(field);
      }
    }
    reset();
    if (isSubmitSuccessful) handleOpen();
  }, [isSubmitSuccessful, isSubmitted, reset, getValues, isValid]);

  return (
    <>
      {
        <Modal
          open={error ? true : false}
          handleClose={clearError}
          modalDescription={error}
        />
      }
      {
        <Modal
          open={open}
          handleClose={handleClose}
          modalText="Successfully submitted"
          modalDescription={
            <>
              <Button onClick={handleClose} variant="contained" color="success">
                Continue
              </Button>
              <span style={{ visibility: "hidden" }}>.....</span>or
              <span style={{ visibility: "hidden" }}>.....</span>
              <Button
                onClick={() => {
                  dispatch(authActions.logout());
                  navigate("/");
                }}
                color="error"
                variant="contained"
              >
                Logout
              </Button>
            </>
          }
        />
      }
      {
        <Modal
          open={errorFields ? true : false}
          modalText={`You missed '${errorFields}' field(s)`}
          modalDescription={
            <Button
              onClick={() => {
                dispatch(authActions.logout());
                navigate("/");
              }}
              color="error"
              variant="contained"
            >
              Logout
            </Button>
          }
        />
      }
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className="disable-click">
          <div className={`${classes.content} center`}>
            <Card className={classes.inner}>
              <div style={{ textAlign: "center" }}>
                <img src={logo} alt="logo" />
                <div className={classes.header}>
                  <h3>DIGITAL INDIA INITIATIVE</h3>
                  <br />
                  <h2>INSERT RECORDS</h2>
                </div>
                <p>
                  <b>TOTAL SESSIONS: {sessionCount}</b>
                </p>
                <p>
                  <b>CURRENT SESSION RECORD COUNT: {totalForms}</b>
                </p>
              </div>
              <br />
              <form
                style={{ cursor: "none" }}
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                {fields.map((field) => (
                  <Fragment key={field.placeholder}>
                    <label style={{ fontWeight: "bolder", cursor: "none" }}>
                      {field.placeholder}:
                    </label>
                    <br />
                    <Input
                      style={{
                        color: "grey",
                        fontFamily: "Source Sans Pro",
                        fontWeight: "-1px",
                        width: "100%",
                      }}
                      className="input__fields"
                      type={field.type}
                      placeholder={field.placeholder}
                      {...register(field.name, { required: true })}
                    />
                    <br />
                    <br />
                  </Fragment>
                ))}
                <div className="center">
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
export default Form;
