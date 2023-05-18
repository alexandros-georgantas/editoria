import React from 'react';
import {Loading} from "../../../ui";
import styled from 'styled-components'

const ListItem = styled.li`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`
const MicroServicesDetails = (props) => {
    if (!props.healthcheck) return <Loading/>
    let data = props.healthcheck;
    return (
        <div>
            The following microservices are in use:
            <ListItem>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <h4>{item.name}</h4>
                            {item.message} URL: {item.url} Uptime: {item.uptime} Timestamp: {item.timestamp} Status: {item.status}
                        </li>
                    ))}
                </ul>
            </ListItem>
        </div>
    );
}

export default MicroServicesDetails;

