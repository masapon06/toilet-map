import React, { useState, useEffect } from "react";
import styled from 'styled-components';

export const Closest = ({closestToilets}) => {  
  return (
    <div>
        <ul>
        {
            closestToilets.map(toilet => (
            <div>
              <li key={`${toilet.latitude * toilet.longitude}list`}>
                {toilet.info}
              </li>
              <li>
                {`${toilet.distance} km先`}
              </li>
            </div>
              )
            )
        }
        </ul>        
    </div>
)
}
