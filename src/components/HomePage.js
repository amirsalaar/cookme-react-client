import React from 'react'
import { Grid, Input } from 'semantic-ui-react';
import FoodIndexPage from './FoodIndexPage';


export default function HomePage() {
  document.body.className = ('home')
  const style = {
    searchInput: { width: '40%' },
  }
  return (
    <Grid verticalAlign='middle' centered>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={10} computer={16}>
          <div className="page">
          <Input size='huge' action={{ icon: 'search' }} placeholder='Search...' style={style.searchInput} />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column mobile={16} tablet={10} computer={16}>
        <div className='page foods'>
          <FoodIndexPage />
        </div>
        </Grid.Column>

      </Grid.Row>

    </Grid>
  )
}
