/* eslint-disable import/no-extraneous-dependencies */
// this will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
