import React from 'react'
import { Grid, Icon } from 'semantic-ui-react';
import FoodItem from './FoodItem';

export default function FoodIndexPage() {
  document.body.classList = '';
  const extra = (
    <a>
      <Icon name='user' />
      16 Friends
    </a>
  )
  return (
    // <main className='page'>
    <div style={{ margin: 20, padding: 10 }}>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <FoodItem />
        </Grid.Column>
      </Grid>
    </div>
    // </main>
  )
}
