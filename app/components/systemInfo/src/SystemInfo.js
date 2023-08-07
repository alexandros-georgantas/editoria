import styled from 'styled-components'
import React from 'react'
import { H3 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Loading } from '../../../ui'

const Container = styled.div`
  clear: both;
  display: block;
  float: none;
  height: calc(100% - 80px);
  margin: 0 auto;
  width: 76%;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const Label = styled.span`
  margin-left: 4px;
`

const HeaderWrapper = styled.div`
  align-items: center;
  justify-content: flex-start;
  margin: calc(2 * ${th('gridUnit')}) 0;
`

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: calc(${th('gridUnit')} * 3);
  width: 100%;
`

const ServicesHeading = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: calc(${th('gridUnit')} * 2);
  width: 100%;
`

const Title = styled(H3)`
  color: #3f3f3f;
  font-family: ${th('fontReading')};
  font-weight: normal;
  margin: 0;
  margin-right: calc(3 * ${th('gridUnit')});
  padding-bottom: 0;
  padding-top: 3px;
  text-transform: uppercase;
`

const SectionServerDetails = styled.div`
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-weight: normal;
  margin: calc(${th('gridUnit')} * 1.5) 0;
`

const StatusExplainerContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: calc(${th('gridUnit')} * 3);
  width: 100%;
`

const StatusItem = styled.div`
  align-items: center;
  display: flex;
`

const ServicesAvailability = styled.div`
  display: flex;
  flex-direction: column;
`

const StatusImage = props => {
  const { isWorking } = props

  return isWorking === true ? (
    <svg
      enableBackground="new 0 0 64 64"
      height="24px"
      viewBox="0 0 64 64"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m32 2c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30"
        fill="#7cb342"
      />
    </svg>
  ) : (
    <svg
      enableBackground="new 0 0 64 64"
      height="24px"
      viewBox="0 0 64 64"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m32 2c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30"
        fill="#e53935"
      />
    </svg>
  )
}

StatusImage.propTypes = {
  isWorking: PropTypes.bool.isRequired,
}

const DisplayNameWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 32px;
  justify-content: flex-start;
  margin-right: calc(${th('gridUnit')} * 2);
`

const ListContent = props => {
  const { microServicesData } = props
  if (!microServicesData) return <Loading />
  const { displayName, isWorking } = microServicesData
  return (
    <DisplayNameWrapper>
      <StatusImage isWorking={isWorking} />
      <Label>{displayName}</Label>
    </DisplayNameWrapper>
  )
}

ListContent.propTypes = {
  microServicesData: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const MicroServicesDetails = props => {
  const { healthcheck } = props
  const { t } = useTranslation()
  if (!healthcheck) return <Loading />
  return (
    <SectionWrapper>
      {/* <ServicesHeading>Services availability:</ServicesHeading> */}

      <ServicesHeading>{t('services_availability')}:</ServicesHeading>
      <ServicesAvailability>
        {healthcheck.map(microServicesData => (
          <StatusItem key={microServicesData.displayName}>
            <ListContent microServicesData={microServicesData} />
          </StatusItem>
        ))}
      </ServicesAvailability>
    </SectionWrapper>
  )
}

MicroServicesDetails.propTypes = {
  healthcheck: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const KeyWrapper = () => {
  const { t } = useTranslation()
  return (
    <StatusExplainerContainer>
      <StatusItem>
        <DisplayNameWrapper>
          <StatusImage isWorking />
          {/* <Label>Available</Label> */}
          <Label>{t('available')}</Label>
        </DisplayNameWrapper>
      </StatusItem>
      <StatusItem>
        <DisplayNameWrapper>
          <StatusImage isWorking={false} />
          {/* <Label>Not Available</Label> */}
          <Label>{t('not_available')}</Label>
        </DisplayNameWrapper>
      </StatusItem>
    </StatusExplainerContainer>
  )
}

const ApplicationDetails = props => {
  const { APP_VERSION } = process.env
  const { systemInfo } = props
  const { t } = useTranslation()

  if (!systemInfo) return <Loading />
  const { version, healthcheck } = systemInfo
  const deploymentDetails = { APP_VERSION, version }
  return (
    <SectionServerDetails>
      <KeyWrapper />
      <SectionWrapper>
        {/* Your deployment uses Ketida’s server on version {version} and Vanilla
        client on version {APP_VERSION} */}
        {t('deployment_details', { deploymentDetails })}
      </SectionWrapper>
      <MicroServicesDetails healthcheck={healthcheck} />
    </SectionServerDetails>
  )
}

ApplicationDetails.propTypes = {
  systemInfo: PropTypes.arrayOf(PropTypes.string),
}
ApplicationDetails.defaultProps = {
  systemInfo: [],
}

const SystemInfo = props => {
  const { systemInfo, loading } = props
  const { t } = useTranslation()
  if (loading && systemInfo.length === 0) return <Loading />
  return (
    <Container>
      <InnerWrapper>
        <HeaderWrapper>
          <Title>{t('system_status')}</Title>
        </HeaderWrapper>
        <SectionWrapper>
          <ApplicationDetails systemInfo={systemInfo} />
        </SectionWrapper>
      </InnerWrapper>
    </Container>
  )
}

SystemInfo.propTypes = {
  systemInfo: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
}
SystemInfo.defaultProps = {
  systemInfo: [],
  loading: true,
}
export default SystemInfo
