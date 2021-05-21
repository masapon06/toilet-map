import React from 'react';
import styled from 'styled-components';
import { Box, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

const TabWrapper = styled.div`
  width: 50vw;
`;

const IconWrappr = styled.div`
    text-align: center;
`;
// 
/**/
export const ClosestTab = ({
    onClickClosestTab,
}) => {
    return (
        <TabWrapper onClick={() => onClickClosestTab()}>
            <IconWrappr>
                <IconButton fontSize="large" color="primary" aria-label="purpose" className="list">
                    <AccessibleForwardIcon />
                </IconButton>
            </IconWrappr>
        </TabWrapper>   
    )
}