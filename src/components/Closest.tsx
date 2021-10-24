import { PlaceType } from '../entity/Place'
import { TitleStyle } from './Styles'
interface PropsType {
  places: PlaceType[]
}

export const Closest: React.FC<PropsType> = (props) => {
  const { places } = props

  // TODO: このソート分離したい。レンダリングするたびにこの処理走るの無駄なので
  // 距離が近い順にソート
  places.sort((a, b) => {
    if (a.distance < b.distance) {
      return -1
    }
    if (a.distance > b.distance) {
      return 1
    }
    return 0
  })

  return (
    <>
      <div className="closest-title-wrapper">
        <TitleStyle>一番近いトイレ</TitleStyle>
      </div>
      <div className="closest-container">
        {places.map((place) => (
          <div className="posts-index-item">
            <a
              className="post-title"
              href={`http://maps.apple.com/maps?q=${place.placeName}&ll=${place.latitude},${place.longitude}`}
            >
              {place.placeName}
            </a>{' '}
            <br></br>
            <a className="small-text">{`${place.distance} km先`}</a>
          </div>
        ))}
      </div>
    </>
  )
}
