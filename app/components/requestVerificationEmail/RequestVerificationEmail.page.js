import React from 'react'
import { useMutation } from '@apollo/client'
import debounce from 'lodash/debounce'
import RequestVerificationEmail from './RequestVerificationEmail'
import REQUEST_VERIFICATION_EMAIL from './queries/requestVerificationEmail.queries'

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
      return false
    }

    /* eslint-disable no-useless-escape */
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    /* eslint-enable no-useless-escape */

    if (!value.match(validEmailRegex)) {
      setFormError('This is not a valid email format')
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
