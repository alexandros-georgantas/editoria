import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from '@apollo/client/react/hoc'
import SIGNUP_USER from './graphql/mutations'

import Signup from './Signup'

const handleSubmit = (
  values,
  { props, setSubmitting, setErrors, setError, setStatus },
) => {
  const { signupUser, history } = props
  values.agreedTc = true

  signupUser({
    variables: { input: values },
  })
    .then(res => {
      setStatus('ok')
      history.push('/login')
    })
    .catch(err => {
      setError(err)
      setSubmitting(false)
      // if (res.graphQLErrors) {
      //   const errors = res.graphQLErrors.map(error => error.message)
      // }
    })
}

const validate = values => {
  const errors = {}

  if (values.givenNames === values.surname) {
    errors.givenNames = 'First name and given name are the same'
    errors.surname = 'First name and given name are the same'
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
