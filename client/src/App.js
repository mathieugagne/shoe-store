import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { shape, func } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WarningIcon from '@material-ui/icons/Warning';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import map from 'lodash/map';
import StoreCard from './shoe-card';
import { globalMessageAction } from './action'
import { WARNING_MESSAGE, ERROR_MESSAGE, NOTICE_MESSAGE } from './constant';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

@connect(state => state, dispatch => ({
  handleGlobalMsgClose: () => dispatch(globalMessageAction(null)),
}))
@withStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))
export default class App extends PureComponent {
  static propTypes = {
    storeData: shape(Object),
    globalMessage: shape(Object),
    handleGlobalMsgClose: func,
    classes: shape(Object).isRequired,
  };
  static defaultProps = {
    storeData: {},
    globalMessage: null,
    handleGlobalMsgClose: () => {},
  };

  getMessageVariant = () => {
    const { globalMessage } = this.props;
    let variant = null;
    if (!!globalMessage) {
      switch (globalMessage.messageType) {
        case WARNING_MESSAGE:
          variant = 'warning';
          break;
        case ERROR_MESSAGE:
          variant = 'error';
          break;
        case NOTICE_MESSAGE:
          variant = 'success';
          break;
        default:
          break;
      }
    }
    return variant;
  }

  render() {
    const { storeData, globalMessage, handleGlobalMsgClose, classes } = this.props;
    const variant = this.getMessageVariant();
    const Icon = variantIcon[variant];
    return (
      <Fragment>
        <AppBar position="static" style={{ marginBottom: 24 }}>
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
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!globalMessage}
          autoHideDuration={6000}
          onClose={handleGlobalMsgClose}
        >
          <SnackbarContent
            className={classes[variant]}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                {Icon && <Icon className={classes.iconVariant} />}
                {globalMessage && globalMessage.message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleGlobalMsgClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </Fragment>
    );
  }
};
