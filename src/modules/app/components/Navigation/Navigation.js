import React from 'react';
import styled from 'styled-components';
import NavigationLink from './NavigationLink';
import NotificationBullet from '../../../notification/components/NotificationBullet';

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

const NotificationLink = styled(NavigationLink)`
  display: flex;
  align-items: center;
  :hover {
    text-decoration: none;
    span {
      text-decoration: underline;
    }
  }
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
        <NotificationLink to="/notifications">
          <span>Notifications</span>
          <NotificationBullet />
        </NotificationLink>
      </Item>
    </List>
  );
}

export default Navigation;
