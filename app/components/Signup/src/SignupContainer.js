import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from '@apollo/client/react/hoc'
import i18next from 'i18next'
import SIGNUP_USER from './graphql/mutations'
// import i18n from "../../../../services/i18n";

import Signup from './Signup'

const handleSubmit = (
  values,
  { props, setSubmitting, setErrors, setStatus },
) => {
  const { signupUser, history } = props

  // at some point implement a Terms and conditions checkbox
  /* eslint-disable no-param-reassign */
  values.agreedTc = true
  /* eslint-enable no-param-reassign */

  signupUser({
    variables: { input: values },
  })
    .then(res => {
      setStatus('ok')
      history.push('/login')
    })
    .catch(err => {
      const errMessage = i18next.t(err.message.toLowerCase().replace(/ /g, '_'))

      setErrors({ api: errMessage })
      setSubmitting(false)
    })
}

const validate = values => {
  const errors = {}

  const errorSameNames = i18next.t(
    'First name and given name are the same'.toLowerCase().replace(/ /g, '_'),
  )

  if (values.givenNames === values.surname) {
    errors.givenNames = errorSameNames // 'First name and given name are the same'
    errors.surname = errorSameNames // 'First name and given name are the same'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  return true
}

const enhancedFormik = withFormik({
  initialValues: {
    givenNames: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    agreedTc: true,
  },
  mapPropsToValues: props => ({
    givenNames: props.givenNames,
    surname: props.surname,
    username: props.username,
    password: props.password,
    email: props.email,
  }),
  validate,
  displayName: 'signup',
  handleSubmit,
})(Signup)

export default compose(
  graphql(SIGNUP_USER, {
    name: 'signupUser',
  }),
)(enhancedFormik)
