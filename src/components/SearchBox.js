import React, { Component } from 'react'
import { Grid, Header, Search, Container, Icon, Image, GridColumn } from 'semantic-ui-react';
import _ from 'lodash';
import PropTypes from 'prop-types'
import Food from '../api/food';
import { withRouter } from 'react-router-dom';

let source = [];

const initialState = {
  isLoading: false,
  results: [],
  value: '',
};
const styles = {
  description: { fontSize: 14, color: 'grey' },
  price: { fontSize: 14, color: 'green' },
  name: { marginBottom: 5 },
  picture: { margin: 'auto' }
};

const resultRenderer = ({ name, description, price, pictures }) => {
  return (
    <Container>
      <Grid>
        <Grid.Column width={11} floated='left'>
          <Header as='h4' content={name} style={styles.name} />
          {description && <p style={styles.description}>{description}</p>}
        </Grid.Column>
        <GridColumn width={3} style={styles.picture}>
          {pictures && <Image src={pictures[0].url} />}

        </GridColumn>
        <Grid.Column
          width={2}
          floated='right'
          textAlign='right'
          style={styles.price}
          verticalAlign='middle'
        >
          {price &&
            <>
              <Icon name='dollar' size='small' /> {price}
            </>
          }

        </Grid.Column>
      </Grid>
    </Container>
  )
}

resultRenderer.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  pictures: PropTypes.array,
  price: PropTypes.string
}


class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  };

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.name });
    this.redirectToResult(result.id);
  };

  redirectToResult = (id) => {
    const { history } = this.props;
    if (history) this.props.history.push(`/foods/${id}`);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  };

  async componentDidMount() {
    await Food.all().then(foods => {
      source = foods
    });
  };

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Search
        fluid
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        resultRenderer={resultRenderer}
        results={results}
        value={value}
        {...this.props}
        size='huge'
      />
    )
  }
}

export default withRouter(SearchBox);
