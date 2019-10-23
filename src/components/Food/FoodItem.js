import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import truncateText from '../../helpers/truncateText';

const styles = {
  cardBox: { height: '100%' }
}

export default function FoodItem(props) {
  const { image, header, meta, description, extra, foodId } = props;
  return (
    <Card
      className='food-item'
      image={image}
      header={header}
      meta={meta}
      description={truncateText(description, 100, '...')}
      extra={extra}
      fluid
      as={Link} to={`/foods/${foodId}`}
      style={styles.cardBox}
    // link
    // raised
    />
  )
}
