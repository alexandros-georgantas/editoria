/* eslint-disable react/prop-types */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react'
import { Loading } from '../../../ui'

const MicroServicesDetails = props => {
  const { healthcheck } = props
  if (!healthcheck) return <Loading />

  return (
    <div>
      <br />
      The following microservices are in use:
      <ul>
        {healthcheck.map(microServicesData => (
          <li key={microServicesData.displayName}>
            <b>{microServicesData.displayName}</b>
            <br />
            <b> URL: </b> {microServicesData.healthcheckURL}
            <b> Is Working: </b> {microServicesData.isWorking.toString()}
          </li>
        ))}
      </ul>
      <br />
      For more information on releases and ongoing development, as well as
      Ketida&#39;s user guide, see the{' '}
      <a href="https://ketida.community/" rel="noreferrer" target="_blank">
        Ketida website.
      </a>
    </div>
  )
}

export default MicroServicesDetails
