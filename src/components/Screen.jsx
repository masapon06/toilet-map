import React, { useState, useEffect } from "react";
import { MapTab } from "./MapTab.jsx";
import { ListTab } from "./ListTab.jsx";
import { List } from "./List.jsx";
import { Map } from "./Map.jsx";
import { PlaceInfo } from "./PlaceInfo.jsx";
import axios from 'axios';
import styled from 'styled-components';
// import getToilets from '../apis/apiFetch';

const apiUrl = "https://data.city.osaka.lg.jp/sparql?default-graph-uri=&query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+ic%3A+%3Chttp%3A%2F%2Fimi.ipa.go.jp%2Fns%2Fcore%2Frdf%23%3E%0D%0ASELECT+DISTINCT+%3Flabel+%3Flatitude+%3Flongitude+WHERE+%7B%0D%0A%3Fs+rdf%3Atype+ic%3A%E6%96%BD%E8%A8%AD%E5%9E%8B+%3B%0D%0A+++++rdfs%3Alabel+%3Flabel+%3B%0D%0A+++++ic%3A%E7%A8%AE%E5%88%A5+%3Ftype+%3B%0D%0A+++++ic%3A%E5%9C%B0%E7%90%86%E5%BA%A7%E6%A8%99+%3Fpoint.%0D%0A%3Fpoint+ic%3A%E7%B7%AF%E5%BA%A6+%3Flatitude+%3B%0D%0A++++++++++++ic%3A%E7%B5%8C%E5%BA%A6+%3Flongitude.%0D%0AFILTER%28%0D%0A%3Ftype+%3D+%22%E5%85%AC%E8%A1%86%E3%83%88%E3%82%A4%E3%83%AC%2F%E5%85%AC%E8%A1%86%E4%BE%BF%E6%89%80%22+or%0D%0A%3Ftype+%3D+%22%E5%85%AC%E8%A1%86%E3%83%88%E3%82%A4%E3%83%AC%2F%E8%BB%8A%E3%81%84%E3%81%99%E5%AF%BE%E5%BF%9C%E5%85%AC%E8%A1%86%E4%BE%BF%E6%89%80%22%0D%0A%29%0D%0A%7D&format=text%2Fhtml&timeout=0&debug=on&format=application/json";

const markerLabel = {
  color: "white",
  fontFamily: "sans-serif",
  fontSize: "15px",
  fontWeight: "100",
  text: "ト",
};

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
  border-top: thin solid #000000;
  width: "100%";
  height: "15vh";
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
`;

const places = [
  { info: "info1", location: { lat: 43.048225, lng: 141.49701 } }
];

const initialState = [];

export const Screen = () => {
  const [switchScreen, setScreen] = useState({
      isVisibleMap: false,
      isVisibleList: false,
      posts: null,
  });

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(apiUrl)
    .then(res => {
      res.data.results.bindings.forEach(function(result) {
        initialState.push({        
        latitude: result.latitude.value,
        longitude: result.longitude.value,
        info: result.label.value,
        }
        );
      });
      setPosts(initialState)
    })
  }, [])
  return (
    <>
    {
    switchScreen.isVisibleList &&
    <List 
    posts={switchScreen.posts}
    />

    }
  
    {
    switchScreen.isVisibleMap && 
    <Map
    posts={switchScreen.posts}
    />
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

