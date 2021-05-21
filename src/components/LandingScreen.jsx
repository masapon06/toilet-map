import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import SearchIcon from '../images/searchIcon.svg';

export const LandingScreen = () => {

  return (
    <div className="header-bg">
    <div className="lp-container">
        <div className="lp-title-wrapper">
            <p className="lp-title">いきたいときに、<br></br>すぐ探せる</p>
        </div>
        <div className="lp-text-wrapper">
            <p className="lp-text">ベビーカーや車椅子で外出したとき、トイレがない。使いたいのに混んでいる。そんなとき、広いトイレを素早く探すことができるのが本アプリケーションです。<br></br><br></br>スマホのホーム画面に追加してお使いください。</p>
        </div>
    </div>
    </div>
)
}