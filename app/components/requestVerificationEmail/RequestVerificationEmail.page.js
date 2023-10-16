import React from 'react'
import { useMutation } from '@apollo/client'
import debounce from 'lodash/debounce'
import RequestVerificationEmail from './RequestVerificationEmail'
import REQUEST_VERIFICATION_EMAIL from './queries/requestVerificationEmail.queries'

/* eslint-disable no-useless-escape, no-control-regex */
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
/* eslint-enable no-useless-escape, no-control-regex */

const RequestVerificationEmailPage = props => {
  const [emailUsed, setEmailUsed] = React.useState('')
  const [inputValue, setInputValue] = React.useState('')
  const [formError, setFormError] = React.useState(undefined)

  const [requestKetidaVerificationEmailMutation, { data, loading, error }] =
    useMutation(REQUEST_VERIFICATION_EMAIL)

  const requestVerificationEmail = () => {
    requestKetidaVerificationEmailMutation({
      variables: { email: inputValue },
    })

    setEmailUsed(inputValue)
    setInputValue('')
  }

  const inputValidation = debounce(value => {
    if (!value || value.length === 0) {
      setFormError('This field is required and should not be empty')
      // const requiredField = t('this_field_is_required_and_should_not_be_empty')
      // setFormError(requiredField)
      return false
    }

    if (!emailRegex.test(value)) {
      // const notAvalidEmail = t('this_is_not_a_valid_email_format')
      setFormError('This is not a valid email format')
      // setFormError(notAvalidEmail)
      return false
    }

    return setFormError(undefined)
  }, 500)

  const handleInputChange = value => {
    inputValidation(value)
    setInputValue(value)
  }

  return (
    <RequestVerificationEmail
      email={inputValue}
      formError={formError}
      handleInputChange={handleInputChange}
      hasError={!!error}
      hasSuccess={!!data}
      loading={loading}
      onSubmit={requestVerificationEmail}
      userEmail={emailUsed}
    />
  )
}

RequestVerificationEmailPage.propTypes = {}

RequestVerificationEmailPage.defaultProps = {}

export default RequestVerificationEmailPage
