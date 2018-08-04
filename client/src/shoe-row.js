import React, { PureComponent } from 'react';
import { shape, bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import IconButton from '@material-ui/core/IconButton';
import deepOrange from '@material-ui/core/colors/deepOrange';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@withStyles({
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
})
export default class ShoeRow extends PureComponent {
  static propTypes = {
    data: shape(Object),
    classes: shape(Object).isRequired,
    floatChangesToTop: bool,
  };
  static defaultProps = {
    data: {},
    floatChangesToTop: false,
  };

  state = {
    data: this.props.data,
  };

  componentWillReceiveProps(newProps) {
    const { data: currentData, floatChangesToTop } = this.props;
    if (!isEqual(newProps.data, currentData)) {
      if (floatChangesToTop) {
        const diff = {};
        const same = {};
        Object
          .keys(newProps.data)
          .forEach(eachKey => {
            if (newProps.data[eachKey] === currentData[eachKey]) {
              same[eachKey] = currentData[eachKey];
            } else {
              diff[eachKey] = newProps.data[eachKey];
            }
          });
        this.setState({
          data: {
            ...diff,
            ...same,
          },
        });
      } else {
        this.setState({ data: newProps.data });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <List>
        {map(data, (data, title) => (
          <ListItem key={title}>
            <Avatar className={classes.orangeAvatar}>
              <AssessmentIcon />
            </Avatar>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
              <ReactCSSTransitionGroup
                transitionName="shoeRowData"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionLeaveTimeout={10}
                transitionEnterTimeout={500}>
                <IconButton key={data}>
                  {data}
                </IconButton>
              </ReactCSSTransitionGroup>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}