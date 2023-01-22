import React from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import Modal from "../../shared/UIElements/Modal/Modal";
import { useHttp } from "../../shared/hooks/http-hook";

import classes from "./css/Lou.module.css";

const Lou = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { uid, token } = useSelector((s) => s.userData);
  const { sendRequest, error, clearError, isLoading } = useHttp();
  const onSubmit = async (data) => {
    const response = await sendRequest(`lou/${uid}`, "POST", data, {
      Authorization: `Bearer ${token}`,
    });
    console.log(response);
    navigate("/server-verification");
  };
  return (
    <>
      {
        <Modal
          open={error ? true : false}
          handleClose={clearError}
          modalDescription={error}
        />
      }
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className={classes.content}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.heading}>
              <h1>
                <u>LETTER OF UNDERATKING</u>
              </h1>
            </div>
            <div className={classes["sub-heading"]}>
              <strong>
                <p>To,</p>
                <p>Governing Department,</p>
                <p>New Delhi</p>
              </strong>
            </div>
            <div className={classes.subject}>
              <h5>
                SUB:<strong>LETTER OF UNDERTAKING.</strong>
              </h5>
            </div>
            <div className={classes.para}>
              <p>
                <strong>
                  I,{" "}
                  <input
                    required
                    style={{ width: "500px" }}
                    type="text"
                    {...register("name")}
                  />
                  ,{" "}
                  <select required {...register("title")}>
                    <option>S/O</option>
                    <option>D/O</option>
                    <option>W/O</option>
                    <option>C/O</option>
                  </select>{" "}
                  <input
                    type="text"
                    style={{ width: "500px" }}
                    required
                    {...register("title_of")}
                  />
                  , DOB:{" "}
                  <input
                    required
                    className="dob"
                    type="date"
                    {...register("dob")}
                  />
                  ,Address
                  <textarea
                    {...register("address")}
                    cols="20"
                    rows="1"
                    style={{ width: "500px" }}
                  />
                  ,State - <input type="text" required {...register("state")} />
                  , Pincode –{" "}
                  <input
                    type="number"
                    name="pincode"
                    required
                    {...register("pincode")}
                  />
                  , Mobile No: {"  "}
                  <input required type="number" {...register("mobile_no")} />,
                  Email id:{" "}
                  <input required type="email" {...register("email")} />,
                </strong>{" "}
                hereby declare that I will be working in the AIUS project as per
                the Guidelines given in agreement as well as whatever is
                instructed in Demo video work.
              </p>
              <p>
                Any Kind of work if done by me will be accepted by me without
                any further discussion.
              </p>
              <p>
                Hereby, I declare that I will work as per the Log-in time
                mentioned and any leave taken by me in future days will be
                notified by me to the registered center by me through mail or
                Telephonic conversation.
              </p>
              <p>
                The above declarations given by me are true and I am providing
                this signed undertaking to the Registered centre.
              </p>
              <p>
                <strong>
                  MAIL ID USED TO REGISTER IN PORTAL (IN CAPITAL LETTERS):{" "}
                  <input type="email" required />
                </strong>
              </p>
              <p>
                <strong>
                  LOGIN ID (TO BE USED FOR LOGIN):{" "}
                  <input
                    type="text required"
                    required
                    {...register("loginin_id")}
                  />
                </strong>
              </p>
              <p>
                <strong>
                  EMPLOYEE ID:{" "}
                  <input type="text" required {...register("employee_id")} />
                </strong>
              </p>
              <p style={{ backgroundColor: "yellow", fontSize: "0.65rem" }}>
                TO BE NOTED:
                <strong>
                  EMPLOYEE ID TO BE FILLED IN EVERY FORM PAGE FIRST. PARICULAR
                  FORM WILL NOT BE COUNTED FOR BILING IF EMPLOYEE ID IS WRONGLY
                  ENTERED BY ANY USER
                </strong>
              </p>
            </div>
            <footer style={{ marginTop: "3rem" }}>
              <p>THANKING YOU, </p>
              <h5>
                NAME : <input type="text" required />
              </h5>
              <h5>
                DATE :{" "}
                <input required type="date" {...register("current_date")} />
              </h5>
              <div className="center">
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </footer>
          </form>
        </div>
      )}
    </>
  );
};

export default Lou;
