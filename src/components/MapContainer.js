import React, { Component } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";
import { Header, Icon, HeaderContent } from 'semantic-ui-react';


class MapContainer extends Component {
  constructor(props) {
    super(props);
    const { kitchen } = this.props;
    this.state = {
      currentLocation: {
        // lat: lat,
        // lng: lng
      },
      kitchen,
      selectedKitchen: null,
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
    }
  };

  markerClick = () => {
    this.setState({ selectedKitchen: this.state.kitchen.cookName })
  };

  closeInfo = () => {
    this.setState({ selectedKitchen: null })
  };


  render() {
    const { lat, lng } = this.state.kitchen;
    const { selectedKitchen, kitchen } = this.state;
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: lat, lng: lng }}
      >
        {
          this.props.isMarkerShown &&
          <Marker
            position={{ lat, lng }}
            onClick={this.markerClick}
          />
        }

        {selectedKitchen &&
          <InfoWindow
            position={{ lat, lng }}
            onCloseClick={this.closeInfo}
          >
            <div className='marker'>
              <Header as='h5'>
                <Icon name='food' />
                {selectedKitchen}
              </Header>
              <div style={{ marginTop: 10 }}>
                <Icon name='clock outline' size='small' />
                Currently Closed
              </div>
              <div>
                <Icon name='phone' size='small' />
                {kitchen.phone}
              </div>
            </div>
          </InfoWindow>}

      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MapContainer));
