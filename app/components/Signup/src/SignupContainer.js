import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from '@apollo/client/react/hoc'
import {useTranslation} from "react-i18next";
import SIGNUP_USER from './graphql/mutations'

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
      setErrors({ api: err.message })
      setSubmitting(false)
    })
}

const validate = values => {
  const { t } = useTranslation()
  const errors = {}
  const sameNames = t('first_name_and_given_name_are_the_same')

  if (values.givenNames === values.surname) {
    errors.givenNames = sameNames // 'First name and given name are the same'
    errors.surname = sameNames // 'First name and given name are the same'
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
