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
    <>
      <div className="closest-title-wrapper">
        <div className="title">
          一番近いトイレ
        </div>
      </div>
      <div className="closest-container">
        {
          closestToilets.map(post => (
            <div className="posts-index-item" >
              <a className="post-title">{post.info}</a> <br></br>
              <a className="small-text">{`${post.distance} km先`}</a>
            </div>
            )
          )
        }
      </div>
    </>
)
}
