import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

const TabWrapper = styled.div`
  width: 33.33vw; 
`; // TODO: オーバーレイリストボタン実装後50vwに修正

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