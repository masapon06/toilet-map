import React from 'react';
import styled from 'styled-components';
import { Box, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

const TabWrapper = styled.div`
  width: 33.33vw;
`;

const IconWrappr = styled.div`
    text-align: center;
`;

export const ListTab = ({
    posts,
    onClickListTab,
}) => {
    return (
        <TabWrapper onClick={() => onClickListTab(posts)}>
            <IconWrappr>
                <div className="list-botton" >リスト</div>
            </IconWrappr>
        </TabWrapper>   
    )
};

