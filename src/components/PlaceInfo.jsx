import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import axios from 'axios';

const apiUrl = 'http://echigodb.jp:8893/sparql/?default-graph-uri=&query=select+distinct+%3Fname+%3Flatitude+%3Flongitude+where+%7B%0D%0A%3Fs+a+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E6%96%BD%E8%A8%AD%E5%9E%8B%3E.%0D%0A%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E6%96%BD%E8%A8%AD%E5%9E%8B%3E+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E9%96%A2%E9%80%A3%E6%96%BD%E8%A8%AD%3E+%3F1.%0D%0A%3F1+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E6%96%BD%E8%A8%AD%3E+%3F2.%0D%0A%3F2+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E5%90%8D%E7%A7%B0%3E+%3F3.%0D%0A%3F3+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E8%A1%A8%E8%A8%98%3E+%3Fname.%0D%0A%3F2+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E5%9C%B0%E7%90%86%E5%BA%A7%E6%A8%99%3E+%3F4.%0D%0A%3F4+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E7%B7%AF%E5%BA%A6%3E+%3Flatitude.%0D%0A%3F4+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%E7%B5%8C%E5%BA%A6%3E+%3Flongitude%0D%0A%7D&format=text%2Fhtml&timeout=0&debug=on&run=+Run+Query+&format=application/json';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const markerLabel = {
  color: "white",
  fontFamily: "sans-serif",
  fontSize: "15px",
  fontWeight: "100",
  text: "ト",
};

export const PlaceInfo = () => {
  const places = [
    { info: "info1", location: { lat: 43.048225, lng: 141.49701 } },
    { info: "info2", location: { lat: 44.048225, lng: 142.49701 } },
    { info: "info3", location: { lat: 37.9133196, lng: 139.0582136 } },
    { info: "info4", location: { lat: 37.9127904, lng: 139.0843233 } },
  ];

  const [selected, setSelected] = useState(null);
  const [posts, setPosts] = useState([]);

  axios
  .get(apiUrl)             //リクエストを飛ばすpath
  .then(response => {
      setPosts(response.data);
      console.log(response.data);
  })                               //成功した場合、postsを更新する（then）
  .catch(() => {
      console.log('通信に失敗しました');
  });    

  return (
    <>
      {places.map((marker) => (
        <Marker
          key={`${marker.location.lat * marker.location.lng}`}
          position={{
            lat: marker.location.lat,
            lng: marker.location.lng,
          }}
          onClick={() => {
            setSelected(marker);
            // マウスオーバーで<InfoWindow>が描画されます。
          }}
          label={markerLabel}
          /*icon={{
            url: "url of icon",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
            // iconを使用したい場合はこのコードをコメントイン       
          }}
          */
        />
      ))}

      {selected ? (
        // MarkerにマウスオーバーされたときにInfoWindowが表示されます。
        <InfoWindow
          position={{
            lat: selected.location.lat,
            lng: selected.location.lng,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>{selected.info}</div>
        </InfoWindow>
      ) : null}
    </>
  );
}

