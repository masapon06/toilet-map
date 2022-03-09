import { useState, useEffect } from 'react'
import './Screen.css'

// material-ui
import styled from 'styled-components'

// 各種コンポーネント
import { List } from './List'
import { Map } from './Map'
import { Closest } from './Closest'
import { Header } from './Header'
import { Tab } from './Tab'
import { LandingScreen } from './FirstView'
import { PlaceType } from '../entity/Place'
import { ScreenType } from '../valueobject/Screen'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaces, Loading, State } from '../modules/Places'

const ContentWrapper = styled.div`
  padding: 21vh 0vh 10vh 0vh;
  position: fixed;
`

const initialScreenState: ScreenType = {
  isVisibleMap: false,
  isVisibleList: false,
  isVisibleClosestToilets: false,
  isVisibleLandingScreen: true,
}

export const Screen = () => {
  const [screen, setScreen] = useState(initialScreenState)

  const dispatch = useDispatch()

  const load = async () => {
    try {
      await dispatch(getPlaces())
    } catch (error) {
      console.log('API CALL ERROR')
    }
  }

  useEffect(() => {
    load()
  }, [])

  interface placesState {
    places: State
  }
  const placesState = useSelector((state) => state.places)

  const searchLoading: Loading = placesState.searchLoading
  const places: PlaceType[] = placesState.places

  const closestToilets = places.filter((place) => Number(place.distance) < 1)

  return (
    <>
      {searchLoading.state === 'started' ? null : ( // TODO: ロード画面の実装
        <div className="responsive">
          <>
            {screen.isVisibleLandingScreen && <LandingScreen />}
            {
              // TODO: ここHeaderを何度も書くのは冗長なので共通化する
              screen.isVisibleList && (
                <ContentWrapper>
                  <Header
                    switchScreen={screen}
                    onClickMapButton={() =>
                      setScreen({
                        isVisibleMap: true,
                        isVisibleList: false,
                        isVisibleClosestToilets: false,
                        isVisibleLandingScreen: false,
                      })
                    }
                    onClickListButton={() =>
                      setScreen({
                        isVisibleMap: false,
                        isVisibleList: true,
                        isVisibleClosestToilets: false,
                        isVisibleLandingScreen: false,
                      })
                    }
                  />
                  <List places={places} />
                </ContentWrapper>
              )
            }

            {screen.isVisibleMap && (
              <ContentWrapper>
                <Header
                  switchScreen={screen}
                  onClickMapButton={() =>
                    setScreen({
                      ...screen,
                      isVisibleMap: true,
                      isVisibleList: false,
                      isVisibleClosestToilets: false,
                      isVisibleLandingScreen: false,
                    })
                  }
                  onClickListButton={() =>
                    setScreen({
                      ...screen,
                      isVisibleMap: false,
                      isVisibleList: true,
                      isVisibleClosestToilets: false,
                      isVisibleLandingScreen: false,
                    })
                  }
                />
                <Map places={places} />
              </ContentWrapper>
            )}

            {screen.isVisibleClosestToilets && (
              <Closest places={closestToilets} />
            )}
            <Tab
              onClickMapTab={() =>
                setScreen({
                  ...screen,
                  isVisibleMap: true,
                  isVisibleList: false,
                  isVisibleClosestToilets: false,
                  isVisibleLandingScreen: false,
                })
              }
              onClickClosestTab={() =>
                setScreen({
                  ...screen,
                  isVisibleMap: false,
                  isVisibleList: false,
                  isVisibleClosestToilets: true,
                  isVisibleLandingScreen: false,
                })
              }
              onClickLandingTab={() =>
                setScreen({
                  ...screen,
                  isVisibleMap: false,
                  isVisibleList: false,
                  isVisibleClosestToilets: false,
                  isVisibleLandingScreen: true,
                })
              }
            />
          </>
        </div>
      )}
    </>
  )
}
