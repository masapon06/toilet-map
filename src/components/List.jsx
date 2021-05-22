import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import SearchIcon from '../images/searchIcon.svg';

export const List = ({posts}) => {  

  return (
    <div className="container">
        {
            posts.map(post => (
              <div className="posts-index-item" >
                <a className="post-title" href={`http://maps.apple.com/maps?q=${post.info}&ll=${post.latitude},${post.longitude}`}>{post.info}</a> <br></br>
                <a className="small-text" >{`${post.distance} km先`}</a>                
              </div>
              )
            )
        }     
    </div>
)
}

