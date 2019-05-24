import React from 'react'
import { Menu, Image, Icon, Header, Dropdown } from 'semantic-ui-react';

export default function DashbordMenuItem(props) {
  const { currentUser } = props;

  const menu = {
    dashbordTitle: currentUser.verified ? 'My Kitchen' : 'Dashbord'
  };

  return (
    <Dropdown text={menu.dashbordTitle} pointing className='link item'>
      <Dropdown.Menu>
        {currentUser.verified ? (
          <>
            <Dropdown.Header>Foods</Dropdown.Header>
            <Dropdown.Item>New Food</Dropdown.Item>
            {/* <Dropdown.Item>
              <Dropdown text='Clothing'>
              <Dropdown.Menu>
              <Dropdown.Header>Post </Dropdown.Header>
              <Dropdown.Item>Shirts</Dropdown.Item>
              <Dropdown.Item>Pants</Dropdown.Item>
              <Dropdown.Item>Jeans</Dropdown.Item>
              <Dropdown.Item>Shoes</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Womens</Dropdown.Header>
              <Dropdown.Item>Dresses</Dropdown.Item>
              <Dropdown.Item>Shoes</Dropdown.Item>
              <Dropdown.Item>Bags</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
              </Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Header>Received Orders</Dropdown.Header>
            <Dropdown.Item>Status</Dropdown.Item>
            <Dropdown.Item>Cancellations</Dropdown.Item>
          </>
        ) : (
            <>
              <Dropdown.Item>Favourite Foods</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>My Orders</Dropdown.Item>
            </>
          )}

      </Dropdown.Menu>
    </Dropdown>
  )
}
