import React, { useEffect, useState } from 'react'
import { Button, Input } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import NavBar from '../components/NavBar'
import Card from '../../shared/UIElements/Card/Card'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import { useHttp } from '../../shared/hooks/http-hook'

import classes from './css/AllForms.module.css'

const AllForms = () => {
  const [forms, setForms] = useState([])
  const [open, setOpen] = useState(false)
  const [fid, setFid] = useState()
  const { register, handleSubmit } = useForm()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const navigate = useNavigate()
  const { token } = useSelector((s) => s.userData)

  const filterFormHandler = (data) => {
    if (!data.filterValue.trim()) return
    setForms(forms.filter((form) => form.employeeId === data.filterValue))
  }

  const deleteFormHandler = async () => {
    setOpen(false)
    try {
      await sendRequest(`delete_form/${fid}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      })
    } catch (e) {
      throw new Error(e)
    }
    alert('Successfully deleted!')
  }

  useEffect(() => {
    ;(async () =>
      setForms(
        (
          await sendRequest('get_forms', 'GET', null, {
            Authorization: `Bearer ${token}`,
          })
        ).forms,
      ))()
  }, [sendRequest, token])

  return (
    <>
      <NavBar />
      <Modal
        open={error ? true : false}
        handleClose={clearError}
        modalDescription={error}
      />
      <Modal
        open={open}
        handleClose={handleClose}
        modalText="Are you  you want to delete this form?"
        modalDescription={
          <>
            <Button
              onClick={deleteFormHandler}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
            <span style={{ visibility: 'hidden' }}>......</span>
            <Button onClick={handleClose} variant="contained" color="success">
              Cancel
            </Button>
          </>
        }
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className={`${classes.content} center`}>
          <Card className={classes.inner}>
            <div className={classes.filter}>
              <form onSubmit={handleSubmit(filterFormHandler)}>
                <label>Enter Employee Id: </label>
                <Input type="text" {...register('filterValue')} />{' '}
                <Button type="submit" variant="contained">
                  Filter
                </Button>
              </form>
            </div>
            <br />
            <hr />
            <div className={classes.wrapper}>
              {forms.length !== 0 && (
                <ol>
                  {forms.map((form) => (
                    <li key={form._id}>
                      <h3>
                        <b>Form Id:</b> {form._id}
                      </h3>
                      <h3>
                        <b>Acknowledgement Number:</b> {form.ack_number}
                      </h3>
                      <h3>
                        <b>Serial Number:</b> {form.serial_number}
                      </h3>
                      <h3>
                        <b>Date of Birth: </b>
                        {new Date(form.dob).toLocaleDateString()}
                      </h3>
                      <h3>
                        <b>Employee Id:</b> {form.employeeId}
                      </h3>
                      <h3>
                        <b>Gender:</b> {form.gender}
                      </h3>
                      <h3>
                        <b>ID. No.:</b> {form.identity_card_num}
                      </h3>
                      <h3>
                        <b>Parent Name:</b> {form.parent_name}
                      </h3>
                      <h3>
                        <b>Pincode:</b> {form.pincode}
                      </h3>
                      <h3>
                        <b>State:</b> {form.state}
                      </h3>
                      <h3>
                        <b>Student Name:</b> {form.student_name}
                      </h3>
                      <h3>
                        <b>Created by:</b> {form.user} (User Id)
                      </h3>
                      <h3>
                        <b>Current Date:</b> {form.current_date}
                      </h3>
                      <div className={`${classes.btn} center`}>
                        <Button
                          onClick={() =>
                            navigate(
                              `/t0SHFA0pHFKayedfQaqy/update-form/${form._id}`,
                            )
                          }
                          color="secondary"
                          variant="contained"
                        >
                          Edit
                        </Button>
                        <span style={{ visibility: 'hidden' }}>......</span>
                        <Button
                          onClick={() => {
                            handleOpen()
                            setFid(form._id)
                          }}
                          color="error"
                          variant="outlined"
                        >
                          Delete
                        </Button>
                      </div>
                      <hr />
                    </li>
                  ))}
                </ol>
              )}
            </div>
            {forms.length === 0 && <p>No form exists</p>}
          </Card>
        </div>
      )}
    </>
  )
}

export default AllForms
