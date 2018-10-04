import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  ::after {
    display: inline-block;
    content: '/';
    padding: 0 ${props => props.theme.gutter / 2}px;
  }
  :last-child {
    width: 100%;
    font-size: ${props => props.theme.text.fontSize * 3}px;
    margin-top: ${props => props.theme.gutter}px;
    margin-bottom: ${props => props.theme.gutter * 1.5}px;
    :after {
      display: none;
    }
  }
`;

function Breadcrumb(props) {
  const { breadcrumb } = props;

  return (
    <nav>
      <List>
        {breadcrumb.map(({ label, to }) => (
          <Item key={label}>{to ? <Link to={to}>{label}</Link> : label}</Item>
        ))}
      </List>
    </nav>
  );
}

Breadcrumb.propTypes = {
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    }),
  ).isRequired,
};

const mapState = ({ app: { breadcrumb } }) => ({
  breadcrumb,
});

export default connect(mapState)(Breadcrumb);
