import React from 'react';
import styled from 'styled-components';
import { Box, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ;
  border-bottom: thin solid #000000;
  width: 100%;
  height: 15vh;
  position: fixed;
  top: 0;
  background-color: #ffffff;
`;

const Header = () => {
    return (
        <HeaderWrapper>
            <IconButton fontSize="large" color="secondary" aria-label="favorite" className="map" 
            >
                <FavoriteIcon />
            </IconButton>        
      </HeaderWrapper>
    )
};