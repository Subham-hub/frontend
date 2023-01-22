import React, { useState, useEffect } from 'react'
import { Button, Input } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import Card from '../../shared/UIElements/Card/Card'
import Modal from '../../shared/UIElements/Modal/Modal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import { useHttp } from '../../shared/hooks/http-hook'

import classes from '../pages/css/ValidateForms.module.css'

const SessionCheck = () => {
  const [forms, setForms] = useState([])
  const [users, setUsers] = useState([])
  const [sessions, setSessions] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const { register, handleSubmit } = useForm()
  const { sendRequest, error, isLoading, clearError } = useHttp()
  const { token } = useSelector((s) => s.userData)

  const searchHandler = (data) => {
    users.splice(0, 1)
    const filteredForms = forms.filter(
      (form) =>
        form.employeeId === data.enteredEmployeeId &&
        form.current_date === data.current_date,
    )
    const user = users.find(
      (user) => user.lou.employee_id === data.enteredEmployeeId,
    )
    if (!user) return
    const filteredFormIds = user.sessions.map((session) =>
      session.forms.filter((form) =>
        filteredForms.find((filteredForm) => filteredForm._id === form),
      ),
    )
    setShowSearch(true)
    setSessions(filteredFormIds)
  }

  useEffect(() => {
    ;(async () => {
      const formResponse = await sendRequest('get_forms', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      const userResponse = await sendRequest('admin_users', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setForms(formResponse.forms)
      setUsers(userResponse.users)
    })()
  }, [sendRequest, token])

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
        <Card className={classes.card}>
          <form onSubmit={handleSubmit(searchHandler)}>
            <label>Enter employee Id:</label>{' '}
            <Input
              type="text"
              {...register('enteredEmployeeId', { required: true })}
            />
            <br />
            <label>Select date:</label>{' '}
            <Input
              type="date"
              {...register('current_date', { required: true })}
            />
            <br />
            <Button type="submit">Search</Button>
            {showSearch && sessions.length !== 0 && (
              <h3>
                Number of sessions done so far:{' '}
                <ol>
                  {sessions.map((session) => (
                    <>
                      <li key={session}>
                        Session(Number of forms in this session {session.length}{' '}
                        )
                      </li>
                      <br />
                      <br />
                    </>
                  ))}
                </ol>
              </h3>
            )}
          </form>
        </Card>
      )}
    </>
  )
}

export default SessionCheck
