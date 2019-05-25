import React from 'react';
import { Card } from 'semantic-ui-react';

export default function FoodItem(props) {
  const { image, header, meta, description, extra } = props;

  return (
    <Card
      image={image}
      header={header}
      meta={meta}
      description={description}
      extra={extra}
    />
  )
}
