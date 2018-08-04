import React, { PureComponent } from 'react';
import { shape, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import StoreIcon from '@material-ui/icons/StoreTwoTone';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import green from '@material-ui/core/colors/green';
import ShoeRow from './shoe-row';
import Dialog from './dialog';

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
  greenAvatar: {
    color: '#fff',
    backgroundColor: green[500],
  },
})
export default class StoreCard extends PureComponent {
  static propTypes = {
    style: shape(Object),
    title: string,
    data: shape(Object),
    classes: shape(Object).isRequired,
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
          <Avatar className={classes.greenAvatar}>
            <StoreIcon />
          </Avatar>
        )}
        title={title} />
        <CardContent className={classes.cardContent}>
          <ShoeRow data={data} floatChangesToTop />
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
