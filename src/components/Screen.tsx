import { useState, useEffect } from "react";
import './Screen.css'

// material-ui
import styled from 'styled-components';

// 各種コンポーネント
import { List } from "./List";
import { Map } from "./Map";
import { Closest } from "./Closest";
import { Header } from "./Header";
import { Tab } from "./Tab";
import { LandingScreen } from "./FirstView";
import { fetchApi } from "../apis/apiFetch";

const ContentWrapper = styled.div`
 padding: 10vh 0vh 10vh 0vh;
`;

// TODO: ファイル分ける
export interface PlaceType {
  latitude: number,
  longitude: number,
  placeName: string,
  distance: string,
}

export interface ScreenType {
  isVisibleMap: boolean,
  isVisibleList: boolean,
  isVisibleClosestToilets: boolean,
  isVisibleLandingScreen: boolean,
  places: PlaceType[],
}

const initialToiletsState: PlaceType[] = [];
const initialClosestsState: PlaceType[] = [];
const initialScreenState: ScreenType = {
  isVisibleMap: false,
  isVisibleList: false,
  isVisibleClosestToilets: false,
  isVisibleLandingScreen: true,
  places: [],
};

/*------------画面切り替え用最上位コンポーネント----------*/
export const Screen = () => {

  const [places, setPlaces] = useState(initialToiletsState)
  const [closestToilets, setClosestToilets] = useState(initialClosestsState)
  const [screen, setScreen] = useState(initialScreenState)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const results = await fetchApi()
    console.log(results)
    setPlaces(results.initialToiletsState)
    setClosestToilets(results.initialClosestsState)
    setLoading(false)
  }

  useEffect(() => {
    load()
  } ,[])

  return (
    <>
      {loading ? (
        null
      ) : (
        <div className="responsive">
        <>
        {
        screen.isVisibleLandingScreen && 
          <LandingScreen/>
        }
        {
        // TODO: ここHeaderを何度も書くのは冗長なので共通化する
        screen.isVisibleList &&
        <ContentWrapper>
        <Header
        switchScreen = {screen}
        onClickMapButton={        
          () => setScreen({
              isVisibleMap: true,
              isVisibleList: false,
              isVisibleClosestToilets: false,
              isVisibleLandingScreen: false,
              places: places,
              })
        }
        onClickListButton={        
          () => setScreen({
            isVisibleMap: false,
            isVisibleList: true,
            isVisibleClosestToilets: false,
            isVisibleLandingScreen: false,
            places: places,
            })
        }
        />
        <List
        places={screen.places}
        />
        </ContentWrapper>
        }
      
        {
        screen.isVisibleMap && 
        <ContentWrapper>
        <Header
        switchScreen = {screen}
        onClickMapButton={() => setScreen({
          ...screen,
          isVisibleMap: true,
          isVisibleList: false,
          isVisibleClosestToilets: false,
          isVisibleLandingScreen: false,
          })}
        onClickListButton={() => setScreen({
          ...screen,
          isVisibleMap: false,
          isVisibleList: true,
          isVisibleClosestToilets: false,
          isVisibleLandingScreen: false,
        })}
        />
        <Map
          places={screen.places} // TODO: ここのposts は、'post' stateからでいい気がするのでそのように変更
        />
        </ContentWrapper>
        }
  
        {
        screen.isVisibleClosestToilets && 
        <Closest
          places={closestToilets}
        />
        }
        <Tab
          onClickMapTab={() => setScreen({
            ... screen,
            isVisibleMap: true,
            isVisibleList: false,
            isVisibleClosestToilets: false,
            isVisibleLandingScreen: false,
          })
        }
          onClickClosestTab={() => setScreen({
            ...screen,
            isVisibleMap: false,
            isVisibleList: false,
            isVisibleClosestToilets: true,
            isVisibleLandingScreen: false,
          })
        }
          onClickLandingTab={() => setScreen({
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
  );
}

