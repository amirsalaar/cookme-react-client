import React from 'react'
import { Grid, GridRow, } from 'semantic-ui-react';
import SearchBox from './SearchBox';

export default function HomePage() {
  document.body.className = ('home-page')
  return (
    <>
      <div className="page">
        <div className="wrap-gird">
          < Grid
            className='home'
            verticalAlign='middle'
            centered
          >
            <GridRow className='home-grid-row'>
              <Grid.Column
                mobile={14}
                tablet={12}
                computer={10}
                largeScreen={10}
              >
                <h1 className="hero-header">Food from anyone, to everyone.</h1>
                {/* <h2 className="hero-tagline">Let home cooks feed you.</h2> */}
              </Grid.Column>
            </GridRow>
            <GridRow className='home-grid-row'>
              <Grid.Column
                mobile={13}
                tablet={11}
                computer={8}
                largeScreen={8}
                stretched
              >
                <SearchBox />
              </Grid.Column>
            </GridRow>
          </Grid >
        </div>
      </div>
    </>
  )
}
