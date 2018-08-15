import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import defer from 'lodash/defer';
import ShoeCard from '../shoe-card';

const data = {
  shoeName1: 10,
  shoeName2: 20,
  shoeName3: 50,
};

describe('shoe-card.js', () => {
  it('without props rendering', () => {
    const wrapper = mount(<ShoeCard />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('with props rendering', () => {
    const wrapper = mount(<ShoeCard
      title="Shoe Store name"
      data={data}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('show/hide dialog', async () => {
    let wrapper = mount(<ShoeCard
      title="Shoe Store name"
      data={data}
    />);
    wrapper.find('Tooltip WithStyles(IconButton)').first().simulate('click');
    await new Promise(resolve => defer(resolve));
    // check dialog is there
    expect(wrapper.find('StoreCard').instance().state).toEqual({ showDialog: true });
    expect(wrapper.find('DialogComponent').length).toBeTruthy();
    wrapper.find('DialogComponent Button').simulate('click');
    await new Promise(resolve => defer(resolve));
    expect(wrapper.find('StoreCard').instance().state).toEqual({ showDialog: false });
    expect(wrapper.find('DialogComponent').length).toBeFalsy();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
