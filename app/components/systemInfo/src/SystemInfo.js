import styled from 'styled-components'
import React from 'react'
import { H3 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { Loading } from '../../../ui'

const Container = styled.div`
  clear: both;
  display: block;
  float: none;
  height: 100%;
  margin: 0 auto;
  max-width: 100%;
`

const InnerWrapper = styled.div`
  clear: both;
  display: block;
  float: none;
  height: calc(100% - 80px);
  margin: 0 auto;
  max-width: 76%;
`

const HeaderWrapper = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  height: calc(9 * ${th('gridUnit')});
  justify-content: flex-start;
  margin-bottom: calc(1 * ${th('gridUnit')});
  position: sticky;
  top: 0;
  z-index: 1;
`

const SectionWrapper = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
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

const ListContainer = styled.ul`
   {
    list-style: none;
    ${({ inline }) =>
      inline &&
      `
    display: flex;
    justify-content:space-around;
  `}
  }
`

const StatusList = styled.li`
   {
  }
`

const StatusAvailable = styled.div`
   {
    ${({ isWorking }) =>
      isWorking == true
        ? `background-image: url('/Eo_circle_light-green_blank.svg');`
        : `background-image: url('/Eo_circle_red_blank.svg');`}

    margin-right: 1rem;
    background-repeat: no-repeat;
    height: 1.5rem;
    width: 1.5rem;
    background-size: 1.5rem 1.5rem;
    position: relative;
    top: 0.4rem;
    margin-bottom: 1rem;
  }
`

const DisplayNameWrapper = styled.div`
   {
    width: max-content;
    padding-left: 2.5rem;
    top: 0;
  }
`

const ListContent = props => {
  const { microServicesData } = props
  if (!microServicesData) return <Loading />
  const { displayName, isWorking } = microServicesData
  return (
    <StatusAvailable isWorking={!!isWorking}>
      <DisplayNameWrapper>{displayName}</DisplayNameWrapper>
    </StatusAvailable>
  )
}

const MicroServicesDetails = props => {
  const { healthcheck } = props
  if (!healthcheck) return <Loading />
  return (
    <SectionWrapper>
      Services availability:
      <ListContainer>
        {healthcheck.map(microServicesData => (
          <StatusList key={microServicesData.displayName}>
            <ListContent microServicesData={microServicesData} />
          </StatusList>
        ))}
      </ListContainer>
    </SectionWrapper>
  )
}

const KeyWrapper = () => {
  return (
    <ListContainer inline>
      <StatusList inline key={1}>
        <StatusAvailable isWorking>
          <DisplayNameWrapper>Available</DisplayNameWrapper>
        </StatusAvailable>
      </StatusList>
      <StatusList inline key={2}>
        <StatusAvailable isWorking={false}>
          <DisplayNameWrapper>Not Available</DisplayNameWrapper>
        </StatusAvailable>
      </StatusList>
    </ListContainer>
  )
}

const ApplicationDetails = props => {
  const { APP_VERSION } = process.env
  const { systemInfo } = props

  if (!systemInfo) return <Loading />
  const { version, healthcheck } = systemInfo

  return (
    <SectionServerDetails>
      <KeyWrapper />
      <SectionWrapper>
        Your deployment uses Ketida’s server on version {version} and Vanilla
        client on version {APP_VERSION}
      </SectionWrapper>
      <MicroServicesDetails healthcheck={healthcheck} />
    </SectionServerDetails>
  )
}

const SystemInfo = props => {
  const { systemInfo, loading } = props
  if (loading) return <Loading />
  return (
    <Container>
      <InnerWrapper>
        <HeaderWrapper>
          <Title>System Status</Title>
        </HeaderWrapper>
        <SectionWrapper>
          <ApplicationDetails systemInfo={systemInfo} />
        </SectionWrapper>
      </InnerWrapper>
    </Container>
  )
}

export default SystemInfo
