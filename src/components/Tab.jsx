import React from 'react';
import styled from 'styled-components';
import { Box, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

export const Tab = () => {
    return (

    <FooterWrapper>
        <TabWrapper>
            <IconWrappr>
                <IconButton fontSize="large" color="secondary" aria-label="favorite" className="map" 
                
                >
                    <FavoriteIcon />
                </IconButton>
            </IconWrappr>
        </TabWrapper>
        <IconWrappr>
        <TabWrapper>
            <IconButton fontSize="large" color="primary" aria-label="purpose" className="list"
            
            >
                <AccessibleForwardIcon />
            </IconButton>
        </TabWrapper>
        </IconWrappr>
    </FooterWrapper>
    )
};