import React from 'react'
import { Label, Icon } from 'semantic-ui-react';

const styles = {
  label: { color: 'rgb(0,128,128)', borderColor: 'rgb(0,128,128)' },
  
}

export default function FoodIngredients(props) {
  const { ingredients } = props;
  return (
    <Label.Group>
      {ingredients.map(ingredient => {
        return (
          <Label
            key={ingredient.id}
            basic
            style={styles.label}
          >
            {ingredient.name}
          </Label>
        )
      })}
    </Label.Group>
  )
}
