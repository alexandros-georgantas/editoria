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
                {data.map((microServicesData, index) => (
                    <li key={index}>
                        <b>{microServicesData.name}</b><br />
                        <b> URL: </b> {microServicesData.url}
                        <b> Uptime: </b> { microServicesData.convertedUpTime }
                        <b> Timestamp: </b> ({microServicesData.convertedtime}) <b> Status: </b> {microServicesData.status}
                        <br />{microServicesData.message}
                    </li>
                ))}
            </ul>
            <br/>
            For more information on releases and ongoing development, as well as Ketida's user guide, see the <a href="https://ketida.community/" target="_blank">Ketida website.</a>
        </div>
    );
}
export default MicroServicesDetails;

