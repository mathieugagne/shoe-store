import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import backArrow from '../../../assets/breadcrumb-back-arrow.svg';

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BackArrowLink = styled(Link).attrs({
  children: <img src={backArrow} alt="Back" />,
})`
  font-size: 26px;
  margin-left: ${props => props.theme.gutter}px;
  margin-top: 6px;
  width: 20px;
  :hover {
    text-decoration: none;
  }
`;

const Item = styled.li`
  display: flex;
  :after {
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

  const lastIndex = breadcrumb.length - 1;
  const showBack = Boolean(get(breadcrumb, `[${lastIndex}].showBack`));
  const backTo = get(breadcrumb, `[${lastIndex - 1}].to`);

  return (
    <nav>
      <List>
        {breadcrumb.map(({ label, to }, index) => (
          <Item key={label}>
            {to ? <Link to={to}>{label}</Link> : label}
            {showBack &&
              backTo &&
              lastIndex === index && <BackArrowLink to={backTo} />}
          </Item>
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
      showBack: PropTypes.bool,
    }),
  ).isRequired,
};

const mapState = ({ app: { breadcrumb } }) => ({
  breadcrumb,
});

export default connect(mapState)(Breadcrumb);
