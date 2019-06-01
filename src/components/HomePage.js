import React from 'react'
import { Grid, Input, GridRow } from 'semantic-ui-react';
import SearchBox from './SearchBox';

export default function HomePage() {
  document.body.className = ('home-page')
  return (
    <>
      <div className="page">
        < Grid className='home' verticalAlign='middle' centered >
          <GridRow>
            <Grid.Column mobile={12} tablet={10} computer={8} largeScreen={11} stretched>
              <h1 className="hero-header">Home cooks get paid to feed you.</h1>
              {/* <h2 className="hero-tagline">Let home cooks feed you.</h2> */}
            </Grid.Column>
          </GridRow>
          <GridRow>
            <Grid.Column mobile={12} tablet={10} computer={8} largeScreen={6} stretched >
              <SearchBox
                
              />
            </Grid.Column>
          </GridRow>
        </Grid >
      </div>
    </>
  )
}
