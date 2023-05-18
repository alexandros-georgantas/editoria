/* eslint-disable react/prop-types */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react';
import {Loading} from "../../../ui";
import styled from 'styled-components'

const ListItem = styled.li`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`
const MicroServicesDetails =  (props) => {
    if (!props.healthcheck) return <Loading/>
    let data = props.healthcheck;
    return (
        <div>
            The following microservices are in use:
            <ListItem>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <b>{item.name}</b><br />
                            {item.message} <br /> <b> URL: </b> {item.url} <b> Uptime: </b> { item.uptime }
                            <b> Timestamp: </b> {
                            item.timestamp } <b> Status: </b> {item.status}
                        </li>
                    ))}
                </ul>
            </ListItem>
        </div>
    );
}

export default MicroServicesDetails;

