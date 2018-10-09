import React from 'react';
import { shallow } from 'enzyme';
import { StoreRead } from './StoreRead';
import StoreCard from '../components/StoreCard';
import StoreInventoryTable from '../../inventory/components/StoreInventoryTable';

describe('src.modules.store.components.StoreRead', () => {
  it('renders loading', () => {
    const wrapper = shallow(<StoreRead isLoading clearQuery={() => {}} />);

    expect(wrapper.contains('Loading...')).toBe(true);
  });

  it('renders no store', () => {
    const wrapper = shallow(
      <StoreRead isLoading={false} clearQuery={() => {}} />,
    );

    expect(wrapper.contains('Store not found')).toBe(true);
  });

  it('renders store', () => {
    const wrapper = shallow(
      <StoreRead
        isLoading={false}
        clearQuery={() => {}}
        store={{ id: 'storeId' }}
      />,
    );

    expect(wrapper.find(StoreCard)).toHaveLength(1);
    expect(wrapper.find(StoreInventoryTable)).toHaveLength(1);
  });

  it('calls clearQuery', () => {
    const clearQuery = jest.fn();
    const wrapper = shallow(
      <StoreRead isLoading={false} clearQuery={clearQuery} />,
    );

    expect(clearQuery.mock.calls.length).toBe(1);
    wrapper.unmount();
    expect(clearQuery.mock.calls.length).toBe(2);
  });
});
