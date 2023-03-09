import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'
import debounce from 'lodash/debounce'
import ResetPassword from './ResetPassword'
import RESET_PASSWORD from './queries/resetPassword.queries'

const ResetPasswordPage = props => {
  const history = useHistory()
  const { token } = useParams()

  const redirectToLogin = () => {
    history.push('/login')
  }

  const [mainPassword, setMainPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [formError, setFormError] = React.useState(undefined)
  const [mainPasswordError, setMainPasswordError] = React.useState(undefined)

  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD)

  const requestPasswordReset = () => {
    resetPassword({
      variables: { password: mainPassword, token },
    })

    setMainPassword('')
    setConfirmPassword('')
  }

  const inputValidation = debounce((value, isPrimary = false) => {
    if (isPrimary) {
      if (!value || value.length < 8) {
        setMainPasswordError(
          'Your password should at least be 8 characters long',
        )
        return false
      }
    } else if (!value || value.length < 8 || value !== mainPassword) {
      setFormError(
        'New password field and confirm password field should be the same',
      )
      return false
    }

    setMainPasswordError(undefined)
    return setFormError(undefined)
  }, 500)

  const handleInputChange = (value, isPrimary = false) => {
    if (isPrimary) {
      inputValidation(value, true)
      setMainPassword(value)
    } else {
      inputValidation(value)
      setConfirmPassword(value)
    }
  }

  return (
    <ResetPassword
      confirmNewPassword={confirmPassword}
      formError={formError}
      handleInputChange={handleInputChange}
      hasError={!!error}
      hasSuccess={!!data}
      loading={loading}
      mainPasswordError={mainPasswordError}
      newPassword={mainPassword}
      onSubmit={requestPasswordReset}
      redirectToLogin={redirectToLogin}
    />
  )
}

ResetPasswordPage.propTypes = {}

ResetPasswordPage.defaultProps = {}

export default ResetPasswordPage
