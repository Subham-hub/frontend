import React, { useEffect, useState } from 'react'
import { Input } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import DoneIcon from '@mui/icons-material/Done'

import Card from '../../shared/UIElements/Card/Card'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import NavBar from './NavBar'
import { useHttp } from '../../shared/hooks/http-hook'
import { useSelector } from 'react-redux'

import classes from './css/UpdateUser.module.css'

const UpdateUser = () => {
  const [user, setUser] = useState()
  const [newName, setNewName] = useState()
  const [showNameIcon, setShowNameIcon] = useState(false)
  const [newEmail, setNewEmail] = useState()
  const [showEmailIcon, setShowEmailIcon] = useState(false)

  const uid = useParams().uid
  const navigate = useNavigate()
  const { token } = useSelector((s) => s.userData)
  const { sendRequest, error, isLoading, clearError } = useHttp()

  const nameInputChangeHandler = (e) => {
    const newName = e.target.value.trim()
    if (newName === user.name) return setShowNameIcon(false)
    setNewName(newName)
    setShowNameIcon(true)
  }
  const emailInputChangeHandler = (e) => {
    const newEmail = e.target.value.trim()
    if (newEmail === user.email) return setShowEmailIcon(false)
    setNewEmail(newEmail)
    setShowEmailIcon(true)
  }

  const nameChangeRequestHandler = async () => {
    await sendRequest(
      'admin_update_user',
      'PUT',
      {
        mode: 'update',
        uid,
        field: 'name',
        name: newName,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    )
    setShowNameIcon(false)
    alert('Name changed successfully to ' + newName)
  }
  const emailChangeRequestHandler = async () => {
    await sendRequest(
      'admin_update_user',
      'PUT',
      {
        mode: 'update',
        uid,
        field: 'email',
        name: newEmail,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    )
    setShowEmailIcon(false)
    alert('Email changed successfully to ' + newEmail)
  }
  const roleChangeRequestHandler = async (e) => {
    await sendRequest(
      'admin_update_user',
      'PUT',
      {
        mode: 'update',
        uid,
        field: 'role',
        role: e.target.value,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    )
    navigate('/t0SHFA0pHFKayedfQaqy/admin')
  }

  useEffect(() => {
    alert("Carefully change user role, it's IRREVERSIBLE")
    const getUser = async () => {
      const response = await sendRequest(`/admin_users/${uid}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setUser(response.user)
    }
    getUser()
  }, [uid, sendRequest, token])

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
      {!isLoading && user && (
        <div className={`${classes.content} center`}>
          <Card className={classes.inner}>
            <h1>{user && user.name}'s profile</h1>
            <form>
              <h1>
                Name:{' '}
                <Input
                  type="text"
                  onChange={nameInputChangeHandler}
                  defaultValue={user && user.name}
                />
                <div onClick={nameChangeRequestHandler}>
                  {showNameIcon && (
                    <DoneIcon style={{ color: 'blue', cursor: 'pointer' }} />
                  )}
                </div>
              </h1>
              <h1>
                Email:{' '}
                <Input
                  type="email"
                  onChange={emailInputChangeHandler}
                  defaultValue={user && user.email}
                />
                <div onClick={emailChangeRequestHandler}>
                  {showEmailIcon && (
                    <DoneIcon style={{ color: 'blue', cursor: 'pointer' }} />
                  )}
                </div>
              </h1>
              <h1>
                Role:{' '}
                <select onChange={roleChangeRequestHandler}>
                  <option>{user.role === 'user' ? 'user' : 'admin'}</option>
                  <option>{user.role === 'user' ? 'admin' : 'user'}</option>
                </select>
              </h1>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}

export default UpdateUser
