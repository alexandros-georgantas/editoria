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
      const { login } = data
      const { token } = login
      localStorage.setItem('token', token)
      setTimeout(() => {
        props.onLoggedIn(getNextUrl())
      }, 100)
    })
    .catch(e => {
      setSubmitting(false)
      setErrors(e)
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
// import React from 'react'
// import { useLocation, Redirect } from 'react-router-dom'
// import { useMutation } from '@apollo/client'
// import LOGIN_USER from './graphql/mutations'
// import Login from './Login'

// const LoginPage = props => {
//   const { search } = useLocation()

//   const [loginMutation, { data, loading, error }] = useMutation(LOGIN_USER)

//   const redirectUrl = new URLSearchParams(search).get('next') || '/books'

//   const login = formData => {
//     const mutationData = {
//       variables: {
//         input: formData,
//       },
//     }

//     loginMutation(mutationData).catch(e => console.error(e))
//   }

//   const existingToken = localStorage.getItem('token')
//   if (existingToken) return <Redirect to={redirectUrl} />

//   let errorMessage = 'Something went wrong!'

//   if (error?.message.includes('username or password'))
//     errorMessage = 'Invalid credentials'

//   if (data) {
//     const token = data.login?.token

//     if (token) {
//       localStorage.setItem('token', token)
//       return <Redirect to={redirectUrl} />
//     }

//     console.error('No token returned from mutation!')
//   }

//   return (
//     <Login
//       errors={errorMessage}
//   handleSubmit={login}
//   logo = {null}
//   signup = {true}
//   passwordReset = {true}
//    />
//   )
// }

// LoginPage.propTypes = {}

// LoginPage.defaultProps = {}

// export default LoginPage
