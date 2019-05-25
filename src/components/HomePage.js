import React from 'react'
import { Grid, Input } from 'semantic-ui-react';
import FoodIndexPage from './FoodIndexPage';


export default function HomePage() {
  document.body.className = ('home-page')
  return (
    <>
      <div className="page">
        < Grid className='home' verticalAlign='middle' centered >
          <Grid.Column mobile={12} tablet={10} computer={8} largeScreen={6} stretched >
            <Input size='huge' action={{ icon: 'search' }} placeholder='Nearby Kitchens...' />
          </Grid.Column>
        </Grid >
      </div>
      <div>

        {/* <Grid.Row>
          <Grid.Column mobile={16} tablet={10} computer={16}>
            <div className='page foods'>
              <FoodIndexPage />
            </div>
          </Grid.Column>
        </Grid.Row> */}

      </div>
    </>
  )
}
