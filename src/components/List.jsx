import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import SearchIcon from '../images/searchIcon.svg';

export const List = ({posts}) => {  

  return (
    <div>
        <ul>
        {
            posts.map(post => (
            <div>
              <li key={`${post.latitude * post.longitude}list`}>
                {post.info}
              </li>
              <li>
                {`${post.distance} km先`}
              </li>
            </div>
              )
            )
        }
        </ul>        
    </div>
)
}

