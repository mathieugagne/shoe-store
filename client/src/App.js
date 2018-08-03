import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import StoreCard from './shoe-card';
import { globalMessageAction } from './action'

@connect(state => state, dispatch => bindActionCreators({
  handleGlobalMsgClose: globalMessageAction,
}, dispatch))
export default class App extends Component {
  render() {
    const { storeData, globalMessage, handleGlobalMsgClose } = this.props;
    return (
      <Fragment>
        <AppBar position="static" style={{
          marginBottom: 24,
        }}>
          <Toolbar>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Shoe Stores
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24}>
          {map(storeData, (data, title) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={title}>
              <Grow in>
                <StoreCard data={data} title={title} />
              </Grow>
            </Grid>
          ))}
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={!!globalMessage}
          autoHideDuration={6000}
          onClose={() => handleGlobalMsgClose(null)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => handleGlobalMsgClose(null)}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Fragment>
    );
  }
}
