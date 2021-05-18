import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// headerで使う
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { MapTab } from "./MapTab.jsx";
import { ListTab } from "./ListTab.jsx";
import { List } from "./List.jsx";
import { Map } from "./Map.jsx";

const apiUrl = "http://echigodb.jp:8893/sparql/?default-graph-uri=&query=select+distinct+%3Fname+%3Flatitude+%3Flongitude+where+%7B%0D%0A%3Fs+a+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E6%96%BD%E8%A8%AD%E5%9E%8B%3E.%0D%0A%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E6%96%BD%E8%A8%AD%E5%9E%8B%3E+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E9%96%A2%E9%80%A3%E6%96%BD%E8%A8%AD%3E+%3F1.%0D%0A%3F1+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E6%96%BD%E8%A8%AD%3E+%3F2.%0D%0A%3F2+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E5%90%8D%E7%A7%B0%3E+%3F3.%0D%0A%3F3+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E8%A1%A8%E8%A8%98%3E+%3Fname.%0D%0A%3F2+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E5%9C%B0%E7%90%86%E5%BA%A7%E6%A8%99%3E+%3F4.%0D%0A%3F4+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E7%B7%AF%E5%BA%A6%3E+%3Flatitude.%0D%0A%3F4+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E7%B5%8C%E5%BA%A6%3E+%3Flongitude%0D%0A%7D&format=text%2Fhtml&timeout=0&debug=on&run=+Run+Query+&format=application/json";
const osakaLodUrl = "https://data.city.osaka.lg.jp/sparql?default-graph-uri=&query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+ic%3A+%3Chttp%3A%2F%2Fimi.ipa.go.jp%2Fns%2Fcore%2Frdf%23%3E%0D%0ASELECT+DISTINCT+%3Flabel+%3Flatitude+%3Flongitude+WHERE+%7B%0D%0A%3Fs+rdf%3Atype+ic%3A%E6%96%BD%E8%A8%AD%E5%9E%8B+%3B%0D%0A+++++rdfs%3Alabel+%3Flabel+%3B%0D%0A+++++ic%3A%E7%A8%AE%E5%88%A5+%3Ftype+%3B%0D%0A+++++ic%3A%E5%9C%B0%E7%90%86%E5%BA%A7%E6%A8%99+%3Fpoint.%0D%0A%3Fpoint+ic%3A%E7%B7%AF%E5%BA%A6+%3Flatitude+%3B%0D%0A++++++++++++ic%3A%E7%B5%8C%E5%BA%A6+%3Flongitude.%0D%0AFILTER%28%0D%0A%3Ftype+%3D+%22%E5%85%AC%E8%A1%86%E3%83%88%E3%82%A4%E3%83%AC%2F%E5%85%AC%E8%A1%86%E4%BE%BF%E6%89%80%22+or%0D%0A%3Ftype+%3D+%22%E5%85%AC%E8%A1%86%E3%83%88%E3%82%A4%E3%83%AC%2F%E8%BB%8A%E3%81%84%E3%81%99%E5%AF%BE%E5%BF%9C%E5%85%AC%E8%A1%86%E4%BE%BF%E6%89%80%22%0D%0A%29%0D%0A%7D&format=text%2Fhtml&timeout=0&debug=on&format=application/json";

const ContentWrapper = styled.div`
  margin-top: 20vh;
  margin-bottom: 10vh;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: ;
  border-top: thin solid #000000;
  width: 100%;
  height: "15vh";
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
`;

const places = [
  { info: "info1", location: { lat: 43.048225, lng: 141.49701 } }
];

const initialState = [];

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

/*
function initMap(){

  let map
  let geocoder

  geocoder = new window.google.maps.Geocoder()

  map = new window.google.maps.Map(document.getElementById('map-search'), {
  center: {lat: 37.912039, lng: 139.061775},
  zoom: 18
  });

  let inputAddress = document.getElementById('ad').textContent;

  geocoder.geocode( { 'address': inputAddress}, function(results, status) {
    if (status == 'OK') {

      map.setCenter(results[0].geometry.location);
      console.log(results[0]);
	  var marker = new window.google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });      
    } else {        
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  
}
*/

export const Screen = () => {
  const [switchScreen, setScreen] = useState({
      isVisibleMap: false,
      isVisibleList: false,
      posts: null,
  });

  const [posts, setPosts] = useState([])

  /* こちらで現在地取得。ひとまず後回し。SSL署名とってから実装する。
  navigator?.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
    const pos = {lat, lng}
    console.log(pos);
  })
  */

  useEffect(() => {
    axios.get(apiUrl) // 大阪の場合: apiUrl -> osakaLodUrl
    .then(res => {
      res.data.results.bindings.forEach(function(result) {
        let dist = String(Math.floor(distance(currentPosition.lat, currentPosition.lng, result.latitude.value, result.longitude.value) * 100) / 100);
        initialState.push({        
        latitude: result.latitude.value,
        longitude: result.longitude.value,
        //info: result.label.value, // 大阪lodの場合
        info: result.name.value, // 新潟lodの場合
        distance: dist,
      }
        );
      });
      setPosts(initialState)
      console.log(initialState);
    })
  }, [])

  return (
    <>
    {
    switchScreen.isVisibleList &&
    <ContentWrapper>
    <List
    posts={switchScreen.posts}
    />
    </ContentWrapper>
    }
  
    {
    switchScreen.isVisibleMap && 
    <ContentWrapper>
    <Map
    posts={switchScreen.posts} // TODO: ここのposts は、'post' stateからでいい気がするのでそのように変更
    />
    </ContentWrapper>
    }
    <FooterWrapper>
        <MapTab
        posts={posts}
        onClickMapTab={        
        (posts) => setScreen({
            isVisibleMap: true,
            isVisibleList: false,
            posts: posts,
            })
        }
        />
        <ListTab
         posts={posts}
         onClickListTab={        
           (posts) => setScreen({
             isVisibleMap: false,
             isVisibleList: true,
             posts: posts,
              })
        }
        />
    </FooterWrapper>
    </>
  );
}

