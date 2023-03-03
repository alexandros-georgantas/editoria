/* eslint-disable react/prop-types, no-shadow */

import React from 'react'
import { adopt } from 'react-adopt'
import {
  UpdatePasswordMutation,
  UpdatePersonalInformationMutation,
} from './queries'
import UserProfile from './ui/UserProfile'

const mapper = {
  UpdatePasswordMutation,
  UpdatePersonalInformationMutation,
}

const mapProps = args => {
  const updatePassword = input =>
    args.UpdatePasswordMutation.updatePassword({
      variables: {
        input,
      },
    })

  const updatePersonalInformation = (id, input) =>
    args.UpdatePersonalInformationMutation.updateUser({
      variables: {
        id,
        input,
      },
    })

  return {
    updatePassword,
    updatePersonalInformation,
  }
}

const Composed = adopt(mapper, mapProps)

const Connected = props => {
  const { currentUser } = props
  return (
    <Composed>
      {props => <UserProfile data={currentUser} {...props} />}
    </Composed>
  )
}

export default Connected
