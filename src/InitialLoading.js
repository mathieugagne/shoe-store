import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { inventoryGlobalRequest } from './modules/inventory/state/inventoryActions';
import { shoeBrowseRequest } from './modules/shoe/state/shoeActions';
import { storeBrowseRequest } from './modules/store/state/storeActions';

class InitialLoading extends Component {
  componentDidMount() {
    const { init } = this.props;

    init();
  }

  render() {
    return null;
  }
}

InitialLoading.propTypes = {
  init: PropTypes.func.isRequired,
};

const mapState = ({ shoe, store, inventory }) => ({
  isShoeLoading: shoe.isLoading,
  isShoeAllLoaded: shoe.isAllLoaded,
  isStoreLoading: store.isLoading,
  isStoreAllLoaded: store.isAllLoaded,
  isGlobalInventoryLoading: inventory.isGlobalLoading,
  isGlobalInventoryLoaded: inventory.isGlobalLoaded,
});

const mapDispatch = dispatch => ({
  fetchAllShoes: () => dispatch(shoeBrowseRequest()),
  fetchAllStores: () => dispatch(storeBrowseRequest()),
  fetchGlobalInventory: () => dispatch(inventoryGlobalRequest()),
});

const mergeProps = (stateProps, dispatchProps) => ({
  init: () => {
    const {
      isShoeLoading,
      isShoeAllLoaded,
      isStoreLoading,
      isStoreAllLoaded,
      isGlobalInventoryLoading,
      isGlobalInventoryLoaded,
    } = stateProps;
    const {
      fetchAllShoes,
      fetchAllStores,
      fetchGlobalInventory,
    } = dispatchProps;

    if (!(isShoeLoading || isShoeAllLoaded)) {
      fetchAllShoes();
    }

    if (!(isStoreLoading || isStoreAllLoaded)) {
      fetchAllStores();
    }

    if (!(isGlobalInventoryLoading || isGlobalInventoryLoaded)) {
      fetchGlobalInventory();
    }
  },
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(InitialLoading);
