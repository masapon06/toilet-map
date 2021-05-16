import React from 'react';
import styled from 'styled-components';
import { Box, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';


const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
  border-top: thin solid #000000;
  width: "100%";
  height: "15vh";
  position: absolute;
  bottom: 0;
`;

const TabWrapper = styled.div`
  width: 50vw;
  height: "15vh";
`;

const IconWrappr = styled.div`
    text-align: center;
`;

export const ListTab = ({
    posts,
    onClickListTab
}) => {
    return (
        <TabWrapper onClick={() => onClickListTab(posts)}>
            <IconWrappr>
                <IconButton fontSize="large" color="primary" aria-label="purpose" className="list">
                    <AccessibleForwardIcon />
                </IconButton>
            </IconWrappr>
        </TabWrapper>   
    )
};