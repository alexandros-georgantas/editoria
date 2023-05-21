/* eslint-disable react/prop-types */
/* stylelint-disable font-family-name-quotes,declaration-no-important */
/* stylelint-disable string-quotes, font-family-no-missing-generic-family-keyword */
import React from 'react';
import {Loading} from "../../../ui";

const MicroServicesDetails =  (props) => {
    if (!props.healthcheck) return <Loading/>
    let data = props.healthcheck;
    return (
        <div>
            <br/>
            The following microservices are in use:
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <b>{item.name}</b><br />
                            {item.message} <br /> <b> URL: </b> {item.url} <b> Uptime: </b> { item.uptime } minutes
                            <b> Timestamp: </b> {item.timestamp} ({item.convertedtime}) <b> Status: </b> {item.status}
                        </li>
                    ))}
                </ul>
        </div>
    );
}
export default MicroServicesDetails;

