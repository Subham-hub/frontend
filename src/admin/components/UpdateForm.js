import React, { useEffect, useState } from 'react'
import { Button, Input } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Card from '../../shared/UIElements/Card/Card'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import NavBar from './NavBar'
import { useHttp } from '../../shared/hooks/http-hook'

import classes from './css/UpdateForm.module.css'

const UpdateForm = () => {
  const [forms, setForms] = useState([])
  const fid = useParams().fid
  const { register, handleSubmit } = useForm()
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const { token } = useSelector((s) => s.userData)

  const onSubmit = async (data) =>
    await sendRequest(
      'update_form',
      'POST',
      { ...data, fid },
      {
        Authorization: `Bearer ${token}`,
      },
    )

  useEffect(() => {
    ;(async () => {
      const response = (
        await sendRequest('get_forms', 'GET', null, {
          Authorization: `Bearer ${token}`,
        })
      ).forms
      setForms(response.filter((form) => form._id === fid))
    })()
  }, [sendRequest, fid, token])

  return (
    <>
      <NavBar />
      <Modal
        open={error ? true : false}
        handleClose={clearError}
        modalDescription={error}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className={`${classes.content} center`}>
          <Card className={classes.inner}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.wrapper}>
                {forms.length !== 0 && (
                  <>
                    {forms.map((form) => (
                      <div key={form._id}>
                        <h3>
                          <b>Form Id:</b> {form._id}
                        </h3>
                        <h3>
                          <b>Employee Id:</b> {form.employeeId}
                        </h3>
                        <h3>
                          <b>Created by:</b> {form.user} (User Id)
                        </h3>
                        <h3>
                          <b>Acknowledgement Number:</b>{' '}
                          <Input
                            defaultValue={form.ack_number}
                            {...register('ack_number')}
                          />
                        </h3>
                        <h3>
                          <b>Serial Number:</b>{' '}
                          <Input
                            defaultValue={form.serial_number}
                            {...register('serial_number')}
                          />
                        </h3>
                        <h3>
                          <b>Date of Birth: </b>
                          <Input
                            type="date"
                            defaultValue={new Date(form.dob)
                              .toISOString()
                              .replace('T00:00:00.000Z', '')
                              .split('/')
                              .reverse()
                              .join('-')}
                            {...register('dob')}
                          />
                        </h3>
                        <h3>
                          <b>Gender:</b>{' '}
                          <Input
                            defaultValue={form.gender}
                            {...register('gender')}
                          />
                        </h3>
                        <h3>
                          <b>ID Number:</b>{' '}
                          <Input
                            defaultValue={form.identity_card_num}
                            {...register('identity_card_num')}
                          />
                        </h3>
                        <h3>
                          <b>Parent Name:</b>{' '}
                          <Input
                            defaultValue={form.parent_name}
                            {...register('parent_name')}
                          />
                        </h3>
                        <h3>
                          <b>Pincode:</b>{' '}
                          <Input
                            defaultValue={form.pincode}
                            {...register('pincode')}
                          />
                        </h3>
                        <h3>
                          <b>State:</b>{' '}
                          <Input
                            defaultValue={form.state}
                            {...register('state')}
                          />
                        </h3>
                        <h3>
                          <b>Student Name:</b>{' '}
                          <Input
                            defaultValue={form.student_name}
                            {...register('student_name')}
                          />
                        </h3>

                        <h3>
                          <b>Current Date:</b> {form.current_date}
                        </h3>
                        <div className={`${classes.btn} center`}>
                          <Button type="submit" variant="contained">
                            Update
                          </Button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {forms.length === 0 && <p>No form exists with that id</p>}
            </form>
          </Card>
        </div>
      )}
    </>
  )
}

export default UpdateForm
