import React from 'react'
import { useMutation } from '@apollo/client'
import debounce from 'lodash/debounce'
import RequestPasswordReset from './RequestPasswordReset'
import REQUEST_PASSWORD_RESET from './queries/requestPasswordReset.queries'

const RequestPasswordResetPage = props => {
  const [emailUsed, setEmailUsed] = React.useState('')
  const [inputValue, setInputValue] = React.useState('')
  const [formError, setFormError] = React.useState(undefined)

  const [requestPasswordResetMutation, { data, loading, error }] = useMutation(
    REQUEST_PASSWORD_RESET,
  )

  const requestPasswordReset = () => {
    requestPasswordResetMutation({
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
    <RequestPasswordReset
      email={inputValue}
      formError={formError}
      handleInputChange={handleInputChange}
      hasError={!!error}
      hasSuccess={!!data}
      loading={loading}
      onSubmit={requestPasswordReset}
      userEmail={emailUsed}
    />
  )
}

RequestPasswordResetPage.propTypes = {}

RequestPasswordResetPage.defaultProps = {}

export default RequestPasswordResetPage
