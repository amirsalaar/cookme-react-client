import React from 'react'
import { Header, Segment, Grid, Tab, Card, Icon } from 'semantic-ui-react';
import MapContainer from './MapContainer';
import { GOOGLE_MAP } from '../config';

const styles = {
  mapGrid: { width: '100%', height: '30vh' },
  locationAddress: { padding: '1em 0em', fontSize: '1.1em' },
  ditanceResult: { marginLeft: 'auto' },
  kitchenInfo: { minHeight: '30vh' }
}

export default function CookInformation(props) {
  const { cook, kitchen, address, calculatedDistance } = props;
  const panes = [
    {
      menuItem: { key: 'location', icon: 'map', content: "Kitchen's Location" },
      render: () => {
        return (
          <Tab.Pane
            attached={false}
            className='kitchen-info-tab'
            style={styles.mapGrid}
          >
            <Grid stackable style={{ height: '25vh' }}>
              <Grid.Column width={16}>
                <div style={styles.locationAddress}>
                  <Card.Meta className='location-pin'>
                    <span>
                      <Icon name='point' />
                      {address}
                    </span>
                    <span style={styles.ditanceResult}>
                      {calculatedDistance}
                    </span>
                  </Card.Meta>
                </div>
                <MapContainer
                  isMarkerShown
                  googleMapURL={GOOGLE_MAP}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  kitchen={{
                    lat: cook.latitude,
                    lng: cook.longitude,
                    cookName: cook.full_name,
                    phone: cook.phone_number
                  }}
                />
              </Grid.Column>
            </Grid>
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: { key: 'information', icon: 'info circle', content: "Kitchen's Information" },
      render: () => {
        return (
          <Tab.Pane 
          className='kitchen-info-tab'
          style={styles.kitchenInfo}

          >

          </Tab.Pane>
        )
      }
    },
  ];

  return (
    <Grid>
      <Grid.Column
        width={16}
        verticalAlign='middle'
      >
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className='kitchen-info-bar'
        />
      </Grid.Column>
    </Grid>
  )
}
