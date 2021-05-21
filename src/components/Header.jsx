import React from 'react';
import styled from 'styled-components';
import { Box, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ;
  width: 100%;
  height: 20vh;
  position: fixed;
  top: 0;
  background-color: #ffffff;
`;

export const Header = ({
  switchScreen,
  onClickMapButton,
  onClickListButton,
}) => {
    return (
        <HeaderWrapper>
          <div className="header-wrapper">
            <div className="title-wrapper">
              <div className="title">
                目的地で検索
              </div>
            </div>
            <div className="all-wrapper">
              <div className="switch-wrapper">
                { switchScreen.isVisibleList &&
                <div className="map-off-button" onClick={() => onClickMapButton(switchScreen.posts)}>マップで表示</div>
                }
                { switchScreen.isVisibleList && 
                <div className="list-on-button">リストで表示</div>
                }
                { switchScreen.isVisibleMap &&
                <div className="map-on-button">マップで表示</div>
                }
                { switchScreen.isVisibleMap && 
                <div className="list-off-button" onClick={() => onClickListButton(switchScreen.posts)}>リストで表示</div>
                }
              </div>
            </div>
          </div>
        </HeaderWrapper>
    )
};