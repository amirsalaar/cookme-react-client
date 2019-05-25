import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function FoodItem(props) {
  const { image, header, meta, description, extra, foodId } = props;
  return (
    <Card
      image={image}
      header={header}
      meta={meta}
      description={description}
      extra={extra}
      fluid
      as={Link} to={`/foods/${foodId}`}
    // link
    // raised
    />
  )
}
