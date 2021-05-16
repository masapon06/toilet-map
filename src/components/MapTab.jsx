import React from 'react';
import styled from 'styled-components';
import { Box, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

const TabWrapper = styled.div`
  width: 50vw;
  height: "15vh";
`;

const IconWrappr = styled.div`
    text-align: center;
`;

export const MapTab = ({
    posts,
    onClickMapTab
}) => {
    return (    
        <TabWrapper onClick={() => onClickMapTab(posts)}>
            <IconWrappr>
                <IconButton fontSize="large" color="secondary" aria-label="favorite" className="map" >
                    <FavoriteIcon />
                </IconButton>
            </IconWrappr>
        </TabWrapper> 
    )
};