import PropTypes from 'prop-types';
import React from 'react';
import styled, { withTheme } from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

const Link = styled(NavLink)`
  font-size: ${props => props.theme.text.fontSize}px;
`;

function NavigationLink(props) {
  const { children, to, theme, className } = props;

  return (
    <Link to={to} activeStyle={{ color: theme.primary }} className={className}>
      {children}
    </Link>
  );
}

NavigationLink.defaultProps = {
  children: null,
  className: null,
};

NavigationLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.object.isRequired,
};

export default withTheme(NavigationLink);
