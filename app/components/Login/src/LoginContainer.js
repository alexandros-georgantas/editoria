import { compose, withState, withHandlers } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from '@apollo/client/react/hoc'
import LOGIN_USER from './graphql/mutations'
import Login from './Login'

const getNextUrl = () => {
  const url = new URL(window.location.href)
  return `${url.searchParams.get('next') || '/'}`
}

const localStorage = window.localStorage || undefined

const handleSubmit = (values, { props, setSubmitting, setErrors }) =>
  props
    .loginUser({
      variables: { input: values },
    })
    .then(({ data }) => {
      const { ketidaLogin } = data
      const { token, code } = ketidaLogin

      if (!code && token) {
        setSubmitting(false)
        localStorage.setItem('token', token)
        setTimeout(() => {
          props.onLoggedIn(getNextUrl())
        }, 100)
      }

      if (code) {
        setErrors({ api: code })
      }
    })
    .catch(e => {
      setSubmitting(false)
      setErrors({ api: e.message })
    })

const enhancedFormik = withFormik({
  initialValues: {
    username: '',
    password: '',
  },
  mapPropsToValues: props => ({
    username: props.username,
    password: props.password,
  }),
  displayName: 'login',
  handleSubmit,
})(Login)

export default compose(
  graphql(LOGIN_USER, {
    name: 'loginUser',
  }),
  withState('redirectLink', 'loggedIn', null),
  withHandlers({
    onLoggedIn:
      ({ loggedIn }) =>
      returnUrl =>
        loggedIn(() => returnUrl),
  }),
)(enhancedFormik)
