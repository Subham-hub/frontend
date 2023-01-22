import React from 'react'
import { Button, Input } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import NavBar from './NavBar'
import Card from '../../shared/UIElements/Card/Card'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import { useHttp } from '../../shared/hooks/http-hook'

import classes from './css/UpdateServerPassword.module.css'

const UpdateServerPassword = () => {
  const { register, handleSubmit } = useForm()
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const { token } = useSelector((s) => s.userData)

  const onSubmit = async (data) => {
    await sendRequest(
      'server-authentication',
      'PATCH',
      {
        adminEneteredPassword: data.newServerPass,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    )
    alert(`Successfully changed to ${data.newServerPass}`)
  }

  return (
    <>
      <NavBar />
      {
        <Modal
          open={error ? true : false}
          handleClose={clearError}
          modalDescription={error}
        />
      }
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className={`${classes.content} center`}>
          <Card className={classes.inner}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>
                Change server password:{' '}
                <Input type="text" {...register('newServerPass')} />{' '}
                <Button type="submit" variant="outlined">
                  Change
                </Button>
              </h2>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}

export default UpdateServerPassword
