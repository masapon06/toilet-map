import { PlaceType } from "../entity/types";

interface ListProps {
  places: PlaceType[]
}

export const List: React.FC<ListProps> = props => { 

  return (
    <div className="container">
        {
            props.places.map((place: PlaceType) => (
              <div className="posts-index-item" >
                <a className="post-title" href={`http://maps.apple.com/maps?q=${place.placeName}&ll=${place.latitude},${place.longitude}`}>{place.placeName}</a> <br></br>
                <a className="small-text" >{`${place.distance} km先`}</a>                
              </div>
              )
            )
        }     
    </div>
)
}

