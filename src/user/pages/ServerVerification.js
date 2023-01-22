import React from 'react'
import { Button, Input } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import { useHttp } from '../../shared/hooks/http-hook'
import { userDataActions } from '../../shared/store/userDataSlice'
import { imp_notice } from '../../shared/util/imp_notice'
import { states } from '../../shared/util/states_array'

import classes from './css/ServerVerification.module.css'

const ServerVerification = () => {
  const { handleSubmit, register } = useForm()
  const { uid, token } = useSelector((s) => s.userData)
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    const response = await sendRequest(
      'server-authentication',
      'POST',
      {
        ...data,
        uid,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    )
    const sid = response.sessions[response.sessions.length - 1]
    dispatch(userDataActions.setSessionId(sid._id))
    if (response.success) navigate('/form')
  }
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
            <div className={`${classes.heading} center`}>
              <h1>
                Enter Server Password <i className="fa fa-lock"></i>
              </h1>
            </div>
            <div className={`${classes.input} center`}>
              <h3>Server Password:</h3> &nbsp; &nbsp;
              <Input
                style={{ width: '500px' }}
                name="Server Password"
                {...register('userEneteredPassword', {
                  required: { value: true, message: 'Empty fields!' },
                  minLength: {
                    value: 6,
                    message: 'Password length must be <6',
                  },
                })}
              />
            </div>
            <br />
            <hr />
            <div className={classes.check}>
              <br />
              <h3>Select</h3>
              {states.map((state) => (
                <div key={state}>
                  <input type="radio" name="state" />
                  <label htmlFor={state}>{state}</label>
                  <br />
                </div>
              ))}
            </div>
            <ul className={classes['important-note']}>
              <h4>**IMPORTANT NOTE**</h4>
              {imp_notice}
            </ul>
            <div className="center">
              <Button type="submit" variant="contained">
                Verify
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default ServerVerification
