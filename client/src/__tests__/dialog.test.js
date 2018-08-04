import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dialog from '../dialog';

describe('dialog.js', () => {
  it('renders', () => {
    const handleClose = jest.fn();
    const wrapper = shallow(<Dialog
      title="Test Title"
      data={{}}
      handleClose={handleClose}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('WithStyles(Button)').simulate('click');
    expect(handleClose).toHaveBeenCalled();
  });
});
