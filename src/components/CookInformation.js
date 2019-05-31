import React from 'react'
import { Header, Segment, Grid } from 'semantic-ui-react';
import MapContainer from './MapContainer';
import { GOOGLE_MAP } from '../config';

const styles = {

}

export default function CookInformation(props) {
  const { cook, kitchen } = props;
  console.log(props)
  return (
    // <Segment>
    //   <Grid stackable>
    //     <Grid.Column width={16} style={styles.mapGrid}>
    //       <MapContainer
    //         isMarkerShown
    //         googleMapURL={GOOGLE_MAP}
    //         loadingElement={<div style={{ height: `100%` }} />}
    //         containerElement={<div style={{ height: `100%` }} />}
    //         mapElement={<div style={{ height: `100%` }} />}
    //         kitchen={{
    //           lat: cook.latitude,
    //           lng: cook.longitude,
    //           cookName: cook.full_name,
    //           phone: cook.phone_number
    //         }}
    //       />
    //     </Grid.Column>
    //     <Grid.Column width={16} style={styles.foodImageGrid}>

    //     </Grid.Column>

    //   </Grid>
    // </Segment>
    <></>
  )
}
