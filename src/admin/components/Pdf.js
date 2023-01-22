import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import Card from '../../shared/UIElements/Card/Card'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import { useHttp } from '../../shared/hooks/http-hook'

import classes from '../pages/css/ValidateForms.module.css'

const Pdf = ({ pdfData }) => {
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showUploadedPdfs, setShowUploadedPdfs] = useState(false)
  const { register, handleSubmit } = useForm()
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const { token } = useSelector((s) => s.userData)

  const onSubmit = async (data) => {
    const formData = new FormData()
    if (data.pdf.length === 0) return
    formData.append('pdf', data.pdf[0])
    try {
      await sendRequest('uploadPdf', 'POST', formData, {
        Authorization: `Bearer ${token}`,
      })
    } catch (e) {
      throw new Error(e)
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
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Card className={classes.card}>
          <Button
            variant="outlined"
            onClick={() => setShowFileUpload((prevState) => !prevState)}
          >
            {!showFileUpload ? 'Show' : 'Hide'} Uploader
          </Button>
          {showFileUpload && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="file" accept=".pdf" {...register('pdf')} />
              <Button variant="contained" type="submit">
                Upload
              </Button>
            </form>
          )}
          <br />
          <br />
          <div>
            <Button
              variant="outlined"
              color="success"
              onClick={() => setShowUploadedPdfs((prevState) => !prevState)}
            >
              {!showUploadedPdfs ? 'Show' : 'hide'} Uploaded PDFS
            </Button>
            {showUploadedPdfs &&
              pdfData.length !== 0 &&
              pdfData.map((pdf) => (
                <p key={pdf._id}>
                  {pdf.name}
                  <Button
                    onClick={async () =>
                      await sendRequest(
                        'delete_pdf',
                        'DELETE',
                        {
                          public_id: pdf.public_id,
                        },
                        {
                          Authorization: `Bearer ${token}`,
                        },
                      )
                    }
                    color="error"
                  >
                    Delete
                  </Button>
                </p>
              ))}
            {pdfData.length === 0 && <p>No pdfs to show</p>}
          </div>
        </Card>
      )}
    </>
  )
}

export default Pdf
