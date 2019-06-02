import React from 'react'
import { Grid, GridRow } from 'semantic-ui-react';
import SearchBox from './SearchBox';

const styles = {
  heroHeader: { fontSize: '4em', textShadow: '2px 2px #000', color: '#fff' },
  girdRow: { marginBottom: '2em' }
}

export default function HomePage() {
  document.body.className = ('home-page')
  return (
    <>
      <div className="page">
        <div className="wrap-gird">
          < Grid className='home' verticalAlign='middle' centered >
            <GridRow className='home-grid-row'>
              <Grid.Column mobile={12} tablet={10} computer={10} largeScreen={10}>
                <h1 className="hero-header">Home cooks get paid to feed you.</h1>
                {/* <Header as='h1' textAlign='center' style={styles.heroHeader}>Home cooks get paid to feed you.</Header> */}
                {/* <h2 className="hero-tagline">Let home cooks feed you.</h2> */}
              </Grid.Column>
            </GridRow>
            <GridRow className='home-grid-row'>
              <Grid.Column mobile={12} tablet={10} computer={9} largeScreen={9} stretched >
                <SearchBox />
              </Grid.Column>
            </GridRow>
          </Grid >
        </div>
      </div>
    </>
  )
}
