import React, { useState, useEffect } from "react";
import styled from 'styled-components';

export const Closest = ({closestToilets}) => {
  
  // 距離が近い順にソート
  closestToilets.sort((a, b) => {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance) {
      return 1;
    }
    return 0;
  });

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
