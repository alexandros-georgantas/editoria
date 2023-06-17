import styled from 'styled-components'
import React from 'react'
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

const Title = styled.div`
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
        ? `background-image: url(data:image/png;base64,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);`
        : `background-image: url(data:image/png;base64,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);`}

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
      <DisplayNameWrapper>{displayName + isWorking}</DisplayNameWrapper>
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

const LegendList = () => {
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
      <LegendList />
      <SectionWrapper>
        Your deployment uses Ketida’s server on version {version} and Vanilla
        client on version {APP_VERSION}
      </SectionWrapper>
      <MicroServicesDetails healthcheck={healthcheck} />
    </SectionServerDetails>
  )
}

const AboutThisSite = props => {
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

export default AboutThisSite
