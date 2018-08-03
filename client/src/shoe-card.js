import React, { PureComponent } from 'react';
import { shape, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import StoreIcon from '@material-ui/icons/StoreTwoTone';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';
import indigo from '@material-ui/core/colors/indigo';
import cyan from '@material-ui/core/colors/cyan';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import ShoeRow from './shoe-row';
import Dialog from './dialog';
import random from 'lodash/random';

const colors = [
  deepOrange[500],
  deepPurple[500],
  amber[500],
  brown[500],
  indigo[500],
  cyan[500],
];

@withStyles({
  card: {
    height: 300,
  },
  cardContent: {
    maxHeight: 130,
    overflow: 'hidden',
  },
  cardActions: {
    margin: 'auto',
    justifyContent: 'center',
  },
})
export default class StoreCard extends PureComponent {
  static propTypes = {
    style: shape(Object),
    title: string,
    data: shape(Object),
  };
  static defaultProps = {
    style: {},
    title: '',
    data: {},
  };

  state = {
    showDialog: false,
  };

  handleDialogClose = () => this.setState({ showDialog: false });
  handleDialogOpen = () => this.setState({ showDialog: true });

  render() {
    const { style, title, data, classes } = this.props;
    return (
      <Card style={style} className={classes.card}>
        <CardHeader avatar={(
          <Avatar color={colors[random(0, 6, false)]}>
            <StoreIcon />
          </Avatar>
        )}
        title={title} />
        <CardContent className={classes.cardContent}>
          <ShoeRow data={data} />
        </CardContent>
        {Object.keys(data).length > 2 && (
          <CardActions className={classes.cardActions}>
            <Tooltip title="Show more">
              <IconButton color="primary" onClick={this.handleDialogOpen}>
                <MoreIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        )}
        {this.state.showDialog && (
          <Dialog title={title} data={data} handleClose={this.handleDialogClose} />
        )}
      </Card>
    );
  }
}
