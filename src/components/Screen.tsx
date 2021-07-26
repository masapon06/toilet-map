import { useState, useEffect } from "react";
import axios from 'axios';
import './Screen.css'

// material-ui
import styled from 'styled-components';

// 各種コンポーネント
import { List } from "./List.jsx";
import { Map } from "./Map.jsx";
import { Closest } from "./Closest.jsx";
import { Header } from "./Header.jsx";
import { Tab } from "./Tab.jsx";
import { LandingScreen } from "./LandingScreen.jsx";

// APIエンドポイント
const apiUrl = "http://echigodb.jp:8893/sparql/?default-graph-uri=&query=prefix+ic%3A+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%3E%0D%0Aselect+%3Fname+%3Fplace+%3Flatitude+%3Flongitude+%3Farea+where%7B%0D%0A%3Fs+ic%3A%E9%96%A2%E9%80%A3%E6%96%BD%E8%A8%AD+%3Fname1.%0D%0A%3Fname1+ic%3A%E6%96%BD%E8%A8%AD+%3Fname2.%0D%0A%3Fname2+ic%3A%E5%90%8D%E7%A7%B0+%3Fname3.%0D%0A%3Fname3+ic%3A%E8%A1%A8%E8%A8%98+%3Fname.%0D%0A%3Fname2+ic%3A%E4%BD%8F%E6%89%80+%3Fplace1.%0D%0A%3Fplace1+ic%3A%E8%A1%A8%E8%A8%98+%3Fplace.%0D%0A%3Fname2+ic%3A%E5%9C%B0%E7%90%86%E5%BA%A7%E6%A8%99+%3Flatitude1.%0D%0A%3Flatitude1+ic%3A%E7%B7%AF%E5%BA%A6+%3Flatitude%3B%0D%0Aic%3A%E7%B5%8C%E5%BA%A6+%3Flongitude.%0D%0A%3Fs+ic%3A%E3%83%A1%E3%82%BF%E3%83%87%E3%83%BC%E3%82%BF+%3Farea1.%0D%0A%3Farea1+ic%3A%E7%99%BA%E8%A1%8C%E8%80%85+%3Farea2.%0D%0A%3Farea2+ic%3A%E4%BD%8F%E6%89%80+%3Farea3.%0D%0A%3Farea3+ic%3A%E5%B8%82%E5%8C%BA%E7%94%BA%E6%9D%91+%3Farea.%0D%0A%7D&format=text%2Fhtml&timeout=0&debug=on&run=+Run+Query+&format=application/json";

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

const initialToiletsState: PlaceType[] = [];
const initialClosestsState: PlaceType[] = [];
const initialScreenState: {
  isVisibleMap: boolean,
  isVisibleList: boolean,
  isVisibleClosestToilets: boolean,
  isVisibleLandingScreen: boolean,
  places: PlaceType[],
} = {
  isVisibleMap: false,
  isVisibleList: false,
  isVisibleClosestToilets: false,
  isVisibleLandingScreen: true,
  places: [],
};

let currentPosition: {
  lat: number
  lng: number
} = {
  lat: 37.912039,
  lng: 139.061775,
}

const distance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  lat1 *= Math.PI / 180;
  lng1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  lng2 *= Math.PI / 180;
  return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
}

/*------------画面切り替え用最上位コンポーネント----------*/
export const Screen = () => {

  const [places, setPlaces] = useState(initialToiletsState)
  const [closestToilets, setClosestToilets] = useState(initialClosestsState)
  const [switchScreen, setScreen] = useState(initialScreenState)

  // 以下で現在地取得。
  // 現状APIがhttps対応していないため現在地は新潟駅の座標で固定
  navigator?.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
    const pos: {
      lat: number
      lng: number
    } = {lat, lng}
    console.log(pos);
    currentPosition = {lat: pos.lat, lng: pos.lng};
  })

  const fetchApi = async () => {
    try {
      await axios.get(apiUrl)
      .then(res => {
        res.data.results.bindings.forEach(function(result: any) {
          let dist_num = Math.floor(distance(currentPosition.lat, currentPosition.lng, result.latitude.value, result.longitude.value) * 100) / 100;
          let dist = String(dist_num);
          // 近いトイレをstateとして保存
          if (dist_num < 1) {
            initialClosestsState.push({
              latitude: result.latitude.value,
              longitude: result.longitude.value,
              placeName: result.name.value,
              distance: dist,
              });
          }
          initialToiletsState.push({
          latitude: result.latitude.value,
          longitude: result.longitude.value,
          placeName: result.name.value,
          distance: dist,
        }
          );
        });
        setPlaces(initialToiletsState)
        setClosestToilets(initialClosestsState)
      })
    } catch(err) {
      console.log('fetch API failed: ', err)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <div className="responsive">
      <>
      {
      switchScreen.isVisibleLandingScreen && 
        <LandingScreen/>
      }
      {
      // TODO: ここHeaderを何度も書くのは冗長なので共通化する
      switchScreen.isVisibleList &&
      <ContentWrapper>
      <Header
      switchScreen = {switchScreen}
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
      places={switchScreen.places}
      />
      </ContentWrapper>
      }
    
      {
      switchScreen.isVisibleMap && 
      <ContentWrapper>
      <Header
      switchScreen = {switchScreen}
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
      <Map
      posts={switchScreen.places} // TODO: ここのposts は、'post' stateからでいい気がするのでそのように変更
      />
      </ContentWrapper>
      }

      {
      switchScreen.isVisibleClosestToilets && 
      <Closest
      closestToilets={closestToilets} // TODO: ここのposts は、'post' stateからでいい気がするのでそのように変更
      />
      }
      <Tab
      posts = {places}
      onClickMapTab={
      (places: PlaceType[]) => setScreen({
          isVisibleMap: true,
          isVisibleList: false,
          isVisibleClosestToilets: false,
          isVisibleLandingScreen: false,
          places: places,
          })
      }
      onClickClosestTab={() => setScreen({
        ...switchScreen,
        isVisibleMap: false,
        isVisibleList: false,
        isVisibleClosestToilets: true,
        isVisibleLandingScreen: false,
        })
      }
      onClickLandingTab={() => setScreen({
        ...switchScreen,
        isVisibleMap: false,
        isVisibleList: false,
        isVisibleClosestToilets: false,
        isVisibleLandingScreen: true,
      })
      }
      />
      </>
    </div>
  );
}

