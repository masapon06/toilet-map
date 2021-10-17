// 以下に現在地から該当トイレまでの距離を計算するロジックを記載
import { latitudeAndLongitude } from "../valueobject/latitudeAndLongitude";

export const distance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    lat1 *= Math.PI / 180;
    lng1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lng2 *= Math.PI / 180;
    const distance: number = 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
    return distance
}
  
// 以下で現在地取得。
// 現状APIがhttps対応していないため現在地は新潟駅の座標で固定される
export const getCurrentPosition = (): latitudeAndLongitude => {
    let initialCurrentPosition: latitudeAndLongitude = { // 新潟駅の座標
        lat: 37.912039,
        lng: 139.061775,
    }
    navigator?.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
        const pos: latitudeAndLongitude = {lat, lng}
        initialCurrentPosition = {lat: pos.lat, lng: pos.lng} // ここがopen apiがhttps未対応によってエラーになる
    })
    return initialCurrentPosition
}