import React from 'react'
import styled from 'styled-components'
import { ScreenType } from '../valueobject/Screen'
import { TitleStyle } from './Styles'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ;
  width: 100%;
  height: 20vh;
  position: fixed;
  top: 0;
  background-color: #ffffff;
`

const ContentWrapper = styled.div`
  overflow: hidden;
  margin-top: 0;
  width: 100vw;
`

const TitleWrapper = styled.div`
  color: #0080c9;
  height: 35px;
  flex-shrink: 0;
  display: flex;
  position: relative;
  -webkit-box-align: center;
  align-items: center;
`

const SwitchWrapper = styled.div`
  height: 29px;
  min-height: 29px;
  border-width: 1px;
  border-color: #0080c9;
  border-radius: 5px;
  border-style: solid;
  display: flex;
  justify-content: stretch;
  -webkit-box-align: stretch;
  align-items: stretch;
  margin: 0px 16px 16px;
`

const MapOffButton = styled.div`
  min-width: 1px;
  width: 1px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  color: #0080c9;
  background-color: transparent;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  text-align: center;
  text-transform: lowercase;
  font-variant: small-caps;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
`

const ListOnButton = styled.div`
  min-width: 1px;
  width: 1px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  color: rgba(255, 255, 255, 0.976);
  background-color: #0080c9;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  text-align: center;
  text-transform: lowercase;
  font-variant: small-caps;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
`

const MapOnButton = styled.div`
  min-width: 1px;
  width: 1px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  color: rgba(255, 255, 255, 0.976);
  background-color: #0080c9;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  text-align: center;
  text-transform: lowercase;
  font-variant: small-caps;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
`

const ListOffButton = styled.div`
  min-width: 1px;
  width: 1px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  color: #0080c9;
  background-color: transparent;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  text-align: center;
  text-transform: lowercase;
  font-variant: small-caps;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
`
interface HeaderProps {
  switchScreen: ScreenType
  onClickMapButton: () => void
  onClickListButton: () => void
}

export const Header: React.FC<HeaderProps> = ({
  switchScreen,
  onClickMapButton,
  onClickListButton,
}) => {
  return (
    <HeaderWrapper>
      <ContentWrapper>
        <TitleWrapper>
          <TitleStyle>目的地で検索</TitleStyle>
        </TitleWrapper>
        <SwitchWrapper>
          {switchScreen.isVisibleList && (
            <MapOffButton onClick={() => onClickMapButton()}>
              マップで表示
            </MapOffButton>
          )}
          {switchScreen.isVisibleList && (
            <ListOnButton>リストで表示</ListOnButton>
          )}
          {switchScreen.isVisibleMap && <MapOnButton>マップで表示</MapOnButton>}
          {switchScreen.isVisibleMap && (
            <ListOffButton onClick={() => onClickListButton()}>
              リストで表示
            </ListOffButton>
          )}
        </SwitchWrapper>
      </ContentWrapper>
    </HeaderWrapper>
  )
}
