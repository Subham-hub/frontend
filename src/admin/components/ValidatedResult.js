import React from 'react'

import Card from '../../shared/UIElements/Card/Card'

import classes from './css/ValidateResult.module.css'

const ValidatedResult = ({ btnType, data }) => {
  let content
  if (btnType === 'valid') {
    content = (
      <div>
        <h2>Total Number of valid forms: {data.validForms.field.length}</h2>
        <p>Field: {data.validForms.field[0]}</p>
        <hr />
        <ol>
          {data.validForms.forms.map((form) => (
            <li key={form._id}>
              <h3>Employee id: {form.employeeId}</h3>
              <h3>Acknowledgement Number: {form.ack_number}</h3>
              <h3>Serial Number: {form.serial_number} </h3>
              <h3>Student name: {form.student_name}</h3>
              <h3>Parent Name: {form.parent_name}</h3>
              <h3>Gender: {form.gender}</h3>
              <h3>State: {form.state}</h3>
              <h3>Pincode: {form.pincode} </h3>
              <h3>Entered by: {form.user}</h3>
              <h3>Created at: {form.createdAt}</h3>
              <h3>Form id: {form._id}</h3>
              <hr />
            </li>
          ))}
        </ol>
      </div>
    )
  } else if (btnType === 'inValid') {
    content = (
      <div>
        <h2>Total Number of invalid forms: {data.inValidForms.field.length}</h2>
        <p>Error Field: {data.inValidForms.field[0]}</p>
        <hr />
        <hr />
        <ol>
          {data.inValidForms.forms.map((form) => (
            <li key={form._id}>
              <h3>Employee id: {form.employeeId}</h3>
              <h3>Acknowledgement Number: {form.ack_number}</h3>
              <h3>Serial Number: {form.serial_number} </h3>
              <h3>Student name: {form.student_name}</h3>
              <h3>Parent Name: {form.parent_name}</h3>
              <h3>Gender: {form.gender}</h3>
              <h3>State: {form.state}</h3>
              <h3>Pincode: {form.pincode} </h3>
              <h3>Created by: {form.user}</h3>
              <h3>Created at: {form.createdAt}</h3>
              <h3>Form id: {form._id}</h3>
              <hr />
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div>
      <Card className={classes.inner}>{content}</Card>
    </div>
  )
}

export default ValidatedResult
