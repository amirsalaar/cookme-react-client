import React, { Component } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";


class MapContainer extends Component {
  constructor(props) {
    super(props);
    const { kitchenLocation } = this.props;
    this.state = {
      currentLocation: {
        // lat: lat,
        // lng: lng
      },
      kitchenLocation
    };
  };

  componentDidMount() {
    this.getCurrentLocation()
  };

  getCurrentLocation = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
      });
    };
  };

  render() {
    const { lat, lng } = this.state.kitchenLocation;
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: lat, lng: lng }}
      >
        {this.props.isMarkerShown && <Marker position={{ lat, lng }} />}
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MapContainer));
