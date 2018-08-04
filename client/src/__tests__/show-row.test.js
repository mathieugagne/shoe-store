import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import defer from 'lodash/defer';
import ShoeRow from '../shoe-row';

const data = {
  shoeName1: 10,
  shoeName2: 20,
  shoeName3: 50,
};
const modifiedData = {
  ...data,
  shoeName4: 90,
};

describe('shoe-card.js', () => {
  it('without props rendering', () => {
    const wrapper = mount(<ShoeRow />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('with props rendering (floatChangesToTop)', () => {
    const wrapper = mount(<ShoeRow
      data={data}
      floatChangesToTop
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('with props rendering (floatChangesToTop=false)', () => {
    const wrapper = mount(<ShoeRow
      data={data}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('trigger prop change (floatChangesToTop)', async () => {
    const wrapper = mount(<ShoeRow
      data={data}
      floatChangesToTop
    />);
    wrapper.find('ShoeRow').instance().componentWillReceiveProps({
      data: modifiedData,
    });
    await new Promise(resolve => defer(resolve));
    expect(wrapper.find('ShoeRow').instance().state).toEqual({ data: modifiedData });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('trigger prop change (floatChangesToTop=false)', async () => {
    const wrapper = mount(<ShoeRow
      data={data}
    />);
    wrapper.find('ShoeRow').instance().componentWillReceiveProps({
      data: modifiedData,
    });
    await new Promise(resolve => defer(resolve));
    expect(wrapper.find('ShoeRow').instance().state).toEqual({ data: modifiedData });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
