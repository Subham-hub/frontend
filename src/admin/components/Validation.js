import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import Card from '../../shared/UIElements/Card/Card'
import ValidatedResult from './ValidatedResult'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import { useHttp } from '../../shared/hooks/http-hook'
import { validateFields } from '../../shared/util/fields'

import classes from '../pages/css/ValidateForms.module.css'

const Validation = ({ pdfData }) => {
  const [data, setData] = useState()
  const { register, handleSubmit } = useForm()
  const [showValidatedResult, setShowValidatedResult] = useState(false)
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const [btnType, setBtnType] = useState()
  const { token } = useSelector((s) => s.userData)

  const validateData = async (data) => {
    const switchValues = {
      EMP_ID: 'emp_id',
      ACK_NUMBER: 'ack_num',
      SERIAL_NUMBER: 'serial_num',
      STUDENT_NAME: 'student_name',
      GENDER: 'gender',
      ID_NUM: 'identity_num',
      DOB: 'dob',
      PARENT_NAME: 'parent_name',
      STATE: 'state',
      PINCODE: 'pincode',
    }
    let key
    switch (data.tobeValidatedField) {
      case 'Employee Id':
        key = switchValues.EMP_ID
        break
      case 'Acknowledgement Number':
        key = switchValues.ACK_NUMBER
        break
      case 'Serial Number':
        key = switchValues.SERIAL_NUMBER
        break
      case 'Student Name':
        key = switchValues.STUDENT_NAME
        break
      case 'Gender':
        key = switchValues.GENDER
        break
      case 'Enter Date Of Birth':
        key = switchValues.DOB
        break
      case 'Parents Name':
        key = switchValues.PARENT_NAME
        break
      case 'Identity Card Number':
        key = switchValues.ID_NUM
        break
      case 'State':
        key = switchValues.STATE
        break
      case 'Pincode':
        key = switchValues.PINCODE
        break
      default:
        throw new Error('Something is wrong')
    }
    const response = await sendRequest(
      'validate_data',
      'POST',
      { key },
      {
        Authorization: `Bearer ${token}`,
      },
    )
    setData(response)
  }

  const configurePdf = async (data) => {
    const pdf = pdfData.find(
      (pdf) =>
        pdf.name.toLowerCase().replace(/\s+/g, '') ===
        data.pdfToBeUsed.toLowerCase().replace(/\s+/g, ''),
    )
    try {
      await sendRequest(
        'configure_data',
        'POST',
        {
          public_id: pdf.public_id,
        },
        {
          Authorization: `Bearer ${token}`,
        },
      )
    } catch (e) {
    } finally {
      alert(`Successfully configured ${pdf.name}`)
    }
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
      <Card className={classes.card}>
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && (
          <div className={classes.fields}>
            {pdfData.length !== 0 && (
              <>
                <label>
                  <h4>Select a pdf to configure</h4>
                </label>
                <form onSubmit={handleSubmit(configurePdf)}>
                  <select
                    style={{ width: '100%', textAlign: 'center' }}
                    {...register('pdfToBeUsed')}
                  >
                    {pdfData.map((pdf) => (
                      <option key={pdf.public_id}>{pdf.name}</option>
                    ))}
                  </select>

                  <br />
                  <br />
                  <Button type="submit" variant="outlined" color="success">
                    Configure
                  </Button>
                </form>
              </>
            )}
            {pdfData.length === 0 && <p>No pdf uploaded yet</p>}
            <br />

            <form onSubmit={handleSubmit(validateData)}>
              <label>
                <h4>Select a field to tally:</h4>
              </label>
              <select {...register('tobeValidatedField')}>
                {validateFields.map((field) => (
                  <option key={field.name}>{field.placeholder}</option>
                ))}
              </select>
              <br />
              <br />
              <Button type="submit" variant="contained" color="error">
                Validate
              </Button>
            </form>
            <br />
            <div className={`${classes.btn} center`}>
              <Button
                onClick={() => {
                  setShowValidatedResult((prevState) => !prevState)
                  setBtnType('valid')
                }}
                variant="contained"
              >
                Show correct forms
              </Button>
              <span style={{ visibility: 'hidden' }}>.......</span>
              <Button
                onClick={() => {
                  setShowValidatedResult((prevState) => !prevState)
                  setBtnType('inValid')
                }}
                variant="contained"
              >
                Show Incorrect forms
              </Button>
            </div>
          </div>
        )}
        {!data && showValidatedResult && <p>Please validate first!</p>}
      </Card>
      <br />
      {showValidatedResult && data && (
        <ValidatedResult btnType={btnType} data={data} />
      )}
    </>
  )
}

export default Validation
