// 以下に現在地から該当トイレまでの距離を計算するロジックを記載
import { Position } from "../valueobject/Position";

export const getDistance = (currentPosition: Position, targetPosition: Position): string => {
    const currentLatitude = currentPosition.lat * Math.PI / 180;
    const currentLongitude = currentPosition.lng * Math.PI / 180;
    const targetLatitude = targetPosition.lat * Math.PI / 180;
    const targetLongitude = targetPosition.lng * Math.PI / 180;
    const distance = 6371 * Math.acos(Math.cos(currentLatitude) * Math.cos(targetLatitude) * Math.cos(targetLongitude - currentLongitude) + Math.sin(currentLatitude) * Math.sin(targetLatitude));
    const result = Math.floor(distance * 100) / 100
    return String(result)
}
  
// 以下で現在地取得。
// 現状APIがhttps対応していないため現在地は新潟駅の座標で固定される
export const getCurrentPosition = (): Position => {
    let initialCurrentPosition: Position = { // 新潟駅の座標
        lat: 37.912039,
        lng: 139.061775,
    }
    navigator?.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
        const pos: Position = {lat, lng}
        initialCurrentPosition = {lat: pos.lat, lng: pos.lng} // ここがopen apiがhttps未対応によってエラーになる
    })
    return initialCurrentPosition
}