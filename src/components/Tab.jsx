import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: ;
  border-top: thin solid #A9A9A9;
  width: 100%;
  height: 8vh;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
`;

const TabWrapper = styled.div`
  width: 33.33vw; 
`; // TODO: オーバーレイリストボタン実装後50vwに修正

const IconWrappr = styled.div`
    text-align: center;
`;

/*------------タブのスタイル----------*/
const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0080c9',
      },
    },
    typography: {
      useNextVariants: true,
    },
  });
  
  const styles = {
    root: {
      width: 500,
    },
  };

/*------------タブコンポーネント----------*/
export const Tab = ({
    posts,
    onClickMapTab,
    onClickClosestTab,
    onClickLandingTab,
}) => {

    const [value, setValue] = useState('使い方')

    const handleChange = () => {
        setValue( {value} );
      }

    
    return (
    <>
    <FooterWrapper>
        <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        className="tab-icon"
        >
            {/*MEMO: BottomNavigationActionは, BottomNavigation直下じゃないと動作しないので注意*/}
            <BottomNavigationAction label="目的地で検索" icon={<LocationOnIcon />} 
            onClick={() => onClickMapTab(posts)}
            />
            <BottomNavigationAction label="一番近いトイレ" icon={<RestoreIcon />} 
            onClick={() => onClickClosestTab()}
            />
            <BottomNavigationAction label="ご説明" icon={<FavoriteIcon />} 
            onClick={() => onClickLandingTab()}
            />
        </BottomNavigation>
    </FooterWrapper>
    </>
    )
};