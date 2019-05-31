import React from 'react'
import { Header } from 'semantic-ui-react';

export default function CookInformation(props) {
  const { cook } = props;
  console.log(cook)
  return (
    <Header
      as='h2'
      image={cook.avatar} content='Learn More'
    />
  )
}
