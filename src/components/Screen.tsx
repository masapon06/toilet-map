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
import { fetchApi } from '../apis/apiFetch'
import { ScreenType } from '../valueobject/Screen'
import { Position } from '../valueobject/Position'
import { getCurrentPosition, getDistance } from '../modules/getDistance'
import { useDispatch } from 'react-redux'
import { getPlaces } from '../modules/Places'

const ContentWrapper = styled.div`
  padding: 21vh 0vh 10vh 0vh;
  position: fixed;
`

const initialToiletsState: PlaceType[] = []
const initialClosestsState: PlaceType[] = []
const initialScreenState: ScreenType = {
  isVisibleMap: false,
  isVisibleList: false,
  isVisibleClosestToilets: false,
  isVisibleLandingScreen: true,
}

export const Screen = () => {
  const [places, setPlaces] = useState(initialToiletsState)
  const [closestToilets, setClosestToilets] = useState(initialClosestsState)
  const [screen, setScreen] = useState(initialScreenState)
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  const load = async () => {
    await dispatch(getPlaces())
    const toilets = await fetchApi()
    const currentPosition: Position = getCurrentPosition()
    toilets.map((toilet) => {
      toilet.distance = getDistance(currentPosition, {
        lat: toilet.latitude,
        lng: toilet.longitude,
      })
    })
    setPlaces(toilets)
    const closestToilets = toilets.filter(
      (toilet) => Number(toilet.distance) < 1
    )
    setClosestToilets(closestToilets)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      {loading ? null : ( // TODO: ロード画面の実装
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
