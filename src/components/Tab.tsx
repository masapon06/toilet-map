import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
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
// TODO: themeをコンポーネントレベルで使うのはよくないのでファイル分ける
const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0080c9',
      },
    },
  });
  
  const styles = {
    root: {
      width: 500,
    },
  };

interface TabProps {
  posts: any
  onClickMapTab: any
  onClickClosestTab: any
  onClickLandingTab: any
}

/*------------タブコンポーネント----------*/
export const Tab: React.FC<TabProps> = props => {
    const { posts, onClickMapTab, onClickClosestTab, onClickLandingTab } = props

    const [value, setValue] = useState('使い方')
    
    return (
    <>
    <div className="responsive">
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
    </div>
    </>
    )
};