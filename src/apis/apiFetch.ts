import axios from 'axios';
import { PlaceType } from '../entity/Place';

// APIエンドポイント
const apiUrl = "http://echigodb.jp:8893/sparql/?default-graph-uri=&query=prefix+ic%3A+%3Chttp%3A%2F%2Fimi.go.jp%2Fns%2Fcore%2F2%23%3E%0D%0Aselect+%3Fname+%3Fplace+%3Flatitude+%3Flongitude+%3Farea+where%7B%0D%0A%3Fs+ic%3A%E9%96%A2%E9%80%A3%E6%96%BD%E8%A8%AD+%3Fname1.%0D%0A%3Fname1+ic%3A%E6%96%BD%E8%A8%AD+%3Fname2.%0D%0A%3Fname2+ic%3A%E5%90%8D%E7%A7%B0+%3Fname3.%0D%0A%3Fname3+ic%3A%E8%A1%A8%E8%A8%98+%3Fname.%0D%0A%3Fname2+ic%3A%E4%BD%8F%E6%89%80+%3Fplace1.%0D%0A%3Fplace1+ic%3A%E8%A1%A8%E8%A8%98+%3Fplace.%0D%0A%3Fname2+ic%3A%E5%9C%B0%E7%90%86%E5%BA%A7%E6%A8%99+%3Flatitude1.%0D%0A%3Flatitude1+ic%3A%E7%B7%AF%E5%BA%A6+%3Flatitude%3B%0D%0Aic%3A%E7%B5%8C%E5%BA%A6+%3Flongitude.%0D%0A%3Fs+ic%3A%E3%83%A1%E3%82%BF%E3%83%87%E3%83%BC%E3%82%BF+%3Farea1.%0D%0A%3Farea1+ic%3A%E7%99%BA%E8%A1%8C%E8%80%85+%3Farea2.%0D%0A%3Farea2+ic%3A%E4%BD%8F%E6%89%80+%3Farea3.%0D%0A%3Farea3+ic%3A%E5%B8%82%E5%8C%BA%E7%94%BA%E6%9D%91+%3Farea.%0D%0A%7D&format=text%2Fhtml&timeout=0&debug=on&run=+Run+Query+&format=application/json";

export const fetchApi: () => Promise<PlaceType[]> = async () => {
  try {
    const response = await axios.get(apiUrl)
    const toilets = response.data.results.bindings.map((result: any) => {
      return {
        latitude: result.latitude.value,
        longitude: result.longitude.value,
        placeName: result.name.value,
        distance: null,
      }
    });
    return toilets

  } catch(err) {
    console.log('fetch API failed: ', err)
    return null
  }
}