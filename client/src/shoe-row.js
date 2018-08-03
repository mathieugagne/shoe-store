import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import IconButton from '@material-ui/core/IconButton';
import map from 'lodash/map';

@withStyles({})
export default class ShoeRow extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <List>
        {map(data, (data, title) => (
          <ListItem key={title}>
            <Avatar>
              <AssessmentIcon />
            </Avatar>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
              <IconButton>
                {data}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}