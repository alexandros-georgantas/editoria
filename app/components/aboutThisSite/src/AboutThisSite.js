/* eslint-disable react/prop-types,react/no-unused-state */
import styled from 'styled-components'
import React from 'react'
import {th} from '@pubsweet/ui-toolkit'
import {H3, H4} from '@pubsweet/ui'
import {Loading} from '../../../ui'
import MicroServicesDetails from "./microServisesDetails";


const InnerSectionWrapper = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const SectionServerDetails = styled(H4)`
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-weight: normal;
  margin: calc(${th('gridUnit')} * 2) 0;
`
const SectionContent = styled(H4)`
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-weight: normal;
  margin: calc(${th('gridUnit')} * 2) 0;
`

const Container = styled.div`
  clear: both;
  display: block;
  float: none;
  height: 100%;
  margin: 0 auto;
  max-width: 100%;
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

const ApplicationDetails = (props) => {
    const app_version = process.env.APP_VERSION
    const app_name =  process.env.APP_NAME
    let  serverVersion, healthcheck;
    if(!props.systemInfo) return <Loading/>;
    if(props.systemInfo) {
        serverVersion = props.systemInfo.version;
        healthcheck = props.systemInfo.healthcheck;
    }
    return (
        <InnerSectionWrapper>
            <SectionServerDetails>
                Ketida server{/*{serverName}*/}: v {serverVersion}   <br />
                {app_name}: v {app_version}
            </SectionServerDetails>
            <MicroServicesDetails healthcheck={healthcheck}/>
        </InnerSectionWrapper>
    )
}

class AboutThisSite extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hideRibbon: true,
            ready: false,
        }
    }

    render() {
        const {systemInfo,loading} = this.props;
        if (loading) return <Loading/>
        return (
            <Container>
                <InnerWrapper>
                    <HeaderWrapper>
                        <Title>About This Site</Title>
                    </HeaderWrapper>
                    <SectionWrapper>
                        <SectionContent>
                            Ketida is built by the Coko development team. This version of Ketida is running the
                            following codebases:
                        </SectionContent>
                        <ApplicationDetails systemInfo={systemInfo}/>
                    </SectionWrapper>
                </InnerWrapper>
            </Container>
        )
    }
}

AboutThisSite.defaultProps = {
    name: null,
    users: null,
}

export default AboutThisSite
