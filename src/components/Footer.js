import React from 'react'
import { Segment, Container, Grid, Header, List, Divider, Image, Button } from 'semantic-ui-react';
import logo from '../assets/images/logo.PNG';

const styles = {
  footerSegment: { padding: '5em 0em', fontSize: '1.1em' },
  footerHeaderContainer: { display: 'flex', justifyContent: 'center', marginTop: '1em', marginBottom: '1em' },
  footerLine: {display: 'flex', justifyContent: 'center', marginTop: '1em', marginBottom: '1em', flexDirection: 'column', alignItems: 'center'}

}

export default function Footer(props) {
  const { isInverted } = props;
  return (
    <Segment inverted={isInverted} style={styles.footerSegment}>
      <Container>
        <Grid divided inverted={isInverted} stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted={isInverted} as='h3' content='About' />
              <List link inverted={isInverted}>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Terms &amp; Conditions</List.Item>
                <List.Item as='a'>Sitemap</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted={isInverted} as='h3' content='Services' />
              <List link inverted={isInverted}>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>FAQ</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h3' inverted={isInverted}>
                CookMe in Social Media
              </Header>
              <div class='social-links'>
                <Button circular color='facebook' icon='facebook' />
                <Button circular color='twitter' icon='twitter' />
                <Button circular color='linkedin' icon='linkedin' />
                <Button circular color='pink' icon='instagram' />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider inverted={isInverted} section />
        <Image src={logo} centered size='tiny' />
        <div style={styles.footerHeaderContainer} >
          <Header as='h1' inverted={isInverted} content='CookMe' />
        </div>
        <div style={styles.footerLine} >
          <div>
            <List horizontal inverted={isInverted} divided link size='small'>
              <List.Item as='a' href='#'>
                Site Map
              </List.Item>
              <List.Item as='a' href='#'>
                Contact Us
              </List.Item>
              <List.Item as='a' href='#'>
                Terms and Conditions
              </List.Item>
              <List.Item as='a' href='#'>
                Privacy Policy
              </List.Item>
            </List>
          </div>
          <div style={{marginTop: '1em', color: 'grey'}}>
            &copy; 2019 CookMe
          </div>
        </div>

      </Container>
    </Segment>
  )
}
