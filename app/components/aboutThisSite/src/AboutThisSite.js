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
    list-style-type:none;
  `}
  }
`

const StatusList = styled.li`
   {
    ${({ inline }) =>
      inline &&
      `
      /*list-style-type: none; display: flex;
    justify-content:space-around;
    list-style-type:none;*/
  `}
  }
`

const StatusAvailable = styled.div`
   {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGw9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE2IDE2IiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxtZXRhZGF0YT4gUHJvZHVjZWQgYnkgT21uaUdyYWZmbGUgNi42LjEgPGRjOmRhdGU+MjAxNi0xMS0xNiAwODozNTo0OSArMDAwMDwvZGM6ZGF0ZT48L21ldGFkYXRhPjxkZWZzLz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2UtZGFzaGFycmF5PSJub25lIiBmaWxsPSJub25lIiBmaWxsLW9wYWNpdHk9IjEiPjx0aXRsZT5DYW52YXMgMTE8L3RpdGxlPjxnPjx0aXRsZT5MYXllciAxPC90aXRsZT48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iOCIgZmlsbD0iIzI4Yzk0MCIvPjwvZz48L2c+PC9zdmc+);
    margin-right: 1rem;
    background-repeat: no-repeat;
    background-position: center;
    height: 1.6rem;
    width: 1.6rem;
    position: relative;
    top: 0.4rem;
    margin-bottom: 1rem;
  }
`

const StatusUnAvailable = styled.div`
   {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGw9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iLTIgLTEgMjIgMjAiIHdpZHRoPSIyMnB0IiBoZWlnaHQ9IjIwcHQiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PG1ldGFkYXRhPiBQcm9kdWNlZCBieSBPbW5pR3JhZmZsZSA2LjYuMSA8ZGM6ZGF0ZT4yMDE2LTExLTE2IDIzOjA2OjA2ICswMDAwPC9kYzpkYXRlPjwvbWV0YWRhdGE+PGRlZnMvPjxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZpbGw9Im5vbmUiIGZpbGwtb3BhY2l0eT0iMSI+PHRpdGxlPmljb25fNTEyeDUxMjwvdGl0bGU+PGc+PHRpdGxlPkxheWVyIDE8L3RpdGxlPjxwYXRoIGQ9Ik0gLS44OTMzMDU0NCAxNy4wMDMyNDYgTCA4LjI1NzEwODQgMS4wMTYzMTYzIEMgOC41MzE0NTggLjUzNjk5MyA5LjE0MjQzMDQgLjM3MDgyODk0IDkuNjIxNzU0IC42NDUxNzg0NCBDIDkuNzc2MzA1IC43MzM2Mzg4IDkuOTA0NDMxIC44NjE3NjQ4NyA5Ljk5Mjg5MTYgMS4wMTYzMTYzIEwgMTkuMTQzMzA1IDE3LjAwMzI0NiBDIDE5LjQxNzY1NSAxNy40ODI1NyAxOS4yNTE0OTEgMTguMDkzNTQyIDE4Ljc3MjE2OCAxOC4zNjc4OTIgQyAxOC42MjA5MjMgMTguNDU0NDU5IDE4LjQ0OTY4MSAxOC41IDE4LjI3NTQxNCAxOC41IEwgLS4wMjU0MTM4ODcgMTguNSBDIC0uNTc3Njk4NjQgMTguNSAtMS4wMjU0MTM5IDE4LjA1MjI4NSAtMS4wMjU0MTM5IDE3LjUgQyAtMS4wMjU0MTM5IDE3LjMyNTczMyAtLjk3OTg3MzI0IDE3LjE1NDQ5MSAtLjg5MzMwNTQ0IDE3LjAwMzI0NiBaIiBmaWxsPSIjZjEyNzFhIi8+PC9nPjwvZz48L3N2Zz4=);
    margin-right: 0.7rem;
    background-repeat: no-repeat;
    height: 1.6rem;
    width: 1.7rem;
    background-size: 1.7rem 1.6rem;
    position: relative;
    left: -0.2rem;
    top: 0;
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
  const { displayName, isWorking } = props.microServicesData

  if (isWorking) {
    return (
      <StatusAvailable>
        <DisplayNameWrapper>{displayName}</DisplayNameWrapper>
      </StatusAvailable>
    )
  }

  return (
    <StatusUnAvailable>
      <DisplayNameWrapper>{displayName}</DisplayNameWrapper>
    </StatusUnAvailable>
  )
}

const MicroServicesDetails = props => {
  const { healthcheck } = props
  if (!healthcheck) return <Loading />
  return (
    <SectionWrapper>
      The following microservices are in use:
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
        <StatusAvailable>
          <DisplayNameWrapper>Available</DisplayNameWrapper>
        </StatusAvailable>
      </StatusList>
      <StatusList inline key={2}>
        <StatusUnAvailable>
          <DisplayNameWrapper>Not Available</DisplayNameWrapper>
        </StatusUnAvailable>
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
      <SectionWrapper>
        For more information on releases and ongoing development, as well as
        Ketida&#39;s user guide, see the{' '}
        <a href="https://ketida.community/" rel="noreferrer" target="_blank">
          Ketida website.
        </a>
      </SectionWrapper>
    </SectionServerDetails>
  )
}

class AboutThisSite extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { systemInfo, loading } = this.props
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
}
export default AboutThisSite
