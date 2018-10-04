import React from 'react';
import styled from 'styled-components';
import NavigationLink from './NavigationLink';

const List = styled.ul`
  display: block;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const Item = styled.li`
  display: block;
  padding: 0;
  margin: 0 0 ${props => props.theme.gutter}px;
  width: 100%;
`;

function Navigation() {
  return (
    <List>
      <Item>
        <NavigationLink to="/overview">Overview</NavigationLink>
      </Item>
      <Item>
        <NavigationLink to="/stores">Stores</NavigationLink>
      </Item>
      <Item>
        <NavigationLink to="/shoes">Shoes</NavigationLink>
      </Item>
      <Item>
        <NavigationLink to="/notifications">Notifications</NavigationLink>
      </Item>
    </List>
  );
}

export default Navigation;
