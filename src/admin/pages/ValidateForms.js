import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import NavBar from '../components/NavBar'
import Pdf from '../components/Pdf'
import Validation from '../components/Validation'
import SessionCheck from '../components/SessionCheck'
import { useHttp } from '../../shared/hooks/http-hook'

import classes from './css/ValidateForms.module.css'

const ValidateForms = () => {
  const [pdfData, setPdfData] = useState([])
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const { token } = useSelector((s) => s.userData)

  useEffect(() => {
    const getServerSettings = async () => {
      const response = await sendRequest('server_settings', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setPdfData(response.settings[0].pdf)
    }
    getServerSettings()
  }, [sendRequest, token])

  console.log(pdfData)

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
      <div className={`${classes.content} center`}>
        <div className={classes.inner}>
          <SessionCheck />
          <br />
          {!isLoading ? (
            <>
              <Pdf pdfData={pdfData} />
              <br />
              <Validation pdfData={pdfData} />
            </>
          ) : (
            <LoadingSpinner asOverlay />
          )}
        </div>
      </div>
    </>
  )
}

export default ValidateForms
