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
}