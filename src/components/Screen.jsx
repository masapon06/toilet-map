import React, { useState, useEffect } from "react";
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

// 本番用api
const apiUrl = "http://echigodb.jp:8893/sparql/?default-graph-uri=&query=prefix+ic%3A+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%3E%0D%0Aselect+%3Fname+%3Fplace+%3Flatitude+%3Flongitude+%3Farea+where%7B%0D%0A%3Fs+ic%3A%E9%96%A2%E9%80%A3%E6%96%BD%E8%A8%AD+%3Fname1.%0D%0A%3Fname1+ic%3A%E6%96%BD%E8%A8%AD+%3Fname2.%0D%0A%3Fname2+ic%3A%E5%90%8D%E7%A7%B0+%3Fname3.%0D%0A%3Fname3+ic%3A%E8%A1%A8%E8%A8%98+%3Fname.%0D%0A%3Fname2+ic%3A%E4%BD%8F%E6%89%80+%3Fplace1.%0D%0A%3Fplace1+ic%3A%E8%A1%A8%E8%A8%98+%3Fplace.%0D%0A%3Fname2+ic%3A%E5%9C%B0%E7%90%86%E5%BA%A7%E6%A8%99+%3Flatitude1.%0D%0A%3Flatitude1+ic%3A%E7%B7%AF%E5%BA%A6+%3Flatitude%3B%0D%0Aic%3A%E7%B5%8C%E5%BA%A6+%3Flongitude.%0D%0A%3Fs+ic%3A%E3%83%A1%E3%82%BF%E3%83%87%E3%83%BC%E3%82%BF+%3Farea1.%0D%0A%3Farea1+ic%3A%E7%99%BA%E8%A1%8C%E8%80%85+%3Farea2.%0D%0A%3Farea2+ic%3A%E4%BD%8F%E6%89%80+%3Farea3.%0D%0A%3Farea3+ic%3A%E5%B8%82%E5%8C%BA%E7%94%BA%E6%9D%91+%3Farea.%0D%0A%7D&format=text%2Fhtml&timeout=0&debug=on&run=+Run+Query+&format=application/json";

// テスト用api
const osakaLodUrl = "https://data.city.osaka.lg.jp/sparql?default-graph-uri=&query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+ic%3A+%3Chttp%3A%2F%2Fimi.ipa.go.jp%2Fns%2Fcore%2Frdf%23%3E%0D%0ASELECT+DISTINCT+%3Flabel+%3Flatitude+%3Flongitude+WHERE+%7B%0D%0A%3Fs+rdf%3Atype+ic%3A%E6%96%BD%E8%A8%AD%E5%9E%8B+%3B%0D%0A+++++rdfs%3Alabel+%3Flabel+%3B%0D%0A+++++ic%3A%E7%A8%AE%E5%88%A5+%3Ftype+%3B%0D%0A+++++ic%3A%E5%9C%B0%E7%90%86%E5%BA%A7%E6%A8%99+%3Fpoint.%0D%0A%3Fpoint+ic%3A%E7%B7%AF%E5%BA%A6+%3Flatitude+%3B%0D%0A++++++++++++ic%3A%E7%B5%8C%E5%BA%A6+%3Flongitude.%0D%0AFILTER%28%0D%0A%3Ftype+%3D+%22%E5%85%AC%E8%A1%86%E3%83%88%E3%82%A4%E3%83%AC%2F%E5%85%AC%E8%A1%86%E4%BE%BF%E6%89%80%22+or%0D%0A%3Ftype+%3D+%22%E5%85%AC%E8%A1%86%E3%83%88%E3%82%A4%E3%83%AC%2F%E8%BB%8A%E3%81%84%E3%81%99%E5%AF%BE%E5%BF%9C%E5%85%AC%E8%A1%86%E4%BE%BF%E6%89%80%22%0D%0A%29%0D%0A%7D&format=text%2Fhtml&timeout=0&debug=on&format=application/json";

const ContentWrapper = styled.div`
 padding: 10vh 0vh 10vh 0vh;
`;

const places = [
  { info: "info1", location: { lat: 43.048225, lng: 141.49701 } }
];

const initialToiletsState = [];

const initialClosestsState = [];

const initialScreenState = {
  isVisibleMap: false,
  isVisibleList: false,
  isVisibleClosestToilets: false,
  isVisibleLandingScreen: true,
  posts: null,
};

const currentPosition = {
  lat: 37.912039,
  lng: 139.061775,
}

function distance(lat1, lng1, lat2, lng2) {
  lat1 *= Math.PI / 180;
  lng1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  lng2 *= Math.PI / 180;
  return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
}

/*------------画面切り替え用最上位コンポーネント----------*/
export const Screen = () => {

  const [posts, setPosts] = useState([])
  const [closestToilets, setClosestToilets] = useState([])
  const [switchScreen, setScreen] = useState(initialScreenState);
  /*
    state = {
    value: 'recents',
  };
  */

  /*
  handleChange = (event, value) => {
    this.setState({ value });
  };
  */

  // こちらで現在地取得。ひとまず後回し。SSL署名とってから実装する。
  navigator?.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
    const pos = {lat, lng}
    console.log(pos);
    currentPosition = {lat: pos.lat, lng: pos.lng};
  })

  useEffect(() => {
    axios.get(apiUrl) // 大阪の場合: apiUrl -> osakaLodUrl
    .then(res => {
      res.data.results.bindings.forEach(function(result) {
        let dist_num = Math.floor(distance(currentPosition.lat, currentPosition.lng, result.latitude.value, result.longitude.value) * 100) / 100;
        let dist = String(dist_num);
        // 近いトイレをstateとして保存
        if (dist_num < 1) {
          // console.log(result.name.value);
          initialClosestsState.push({
            latitude: result.latitude.value,
            longitude: result.longitude.value,
            //info: result.label.value, // 大阪lodの場合
            info: result.name.value, // 新潟lodの場合
            distance: dist,
            });
        }
        initialToiletsState.push({
        latitude: result.latitude.value,
        longitude: result.longitude.value,
        //info: result.label.value, // 大阪lodの場合
        info: result.name.value, // 新潟lodの場合
        distance: dist,
      }
        );
      });
      setPosts(initialToiletsState)
      setClosestToilets(initialClosestsState)
      // console.log(closestToilets); //OK
    })
  }, [])



  return (
    <dev className="responsive">
      <>
      {
      switchScreen.isVisibleLandingScreen && 
        <LandingScreen/>
      }
      {
      switchScreen.isVisibleList &&
      <ContentWrapper>
      <Header
      switchScreen = {switchScreen}
      onClickMapButton={        
        (posts) => setScreen({
            isVisibleMap: true,
            isVisibleList: false,
            isVisibleClosestToilets: false,
            isVisibleLandingScreen: false,
            posts: posts,
            })
      }
      onClickListButton={        
        (posts) => setScreen({
          isVisibleMap: false,
          isVisibleList: true,
          isVisibleClosestToilets: false,
          isVisibleLandingScreen: false,
          posts: posts,
          })
      }
      />
      <List
      posts={switchScreen.posts}
      />
      </ContentWrapper>
      }
    
      {
      switchScreen.isVisibleMap && 
      <ContentWrapper>
      <Header
      switchScreen = {switchScreen}
      onClickMapButton={        
        (posts) => setScreen({
            isVisibleMap: true,
            isVisibleList: false,
            isVisibleClosestToilets: false,
            isVisibleLandingScreen: false,
            posts: posts,
            })
      }
      onClickListButton={        
        (posts) => setScreen({
          isVisibleMap: false,
          isVisibleList: true,
          isVisibleClosestToilets: false,
          isVisibleLandingScreen: false,
          posts: posts,
          })
      }
      />
      <Map
      posts={switchScreen.posts} // TODO: ここのposts は、'post' stateからでいい気がするのでそのように変更
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
      posts = {posts}
      onClickMapTab={
      (posts) => setScreen({
          isVisibleMap: true,
          isVisibleList: false,
          isVisibleClosestToilets: false,
          isVisibleLandingScreen: false,
          posts: posts,
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
    </dev>
  );
}

