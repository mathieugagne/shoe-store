import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RobustWS from 'robust-websocket';

//Adding this line because of https://github.com/mui-org/material-ui/issues/12159
// We should remove this line once the issue in material-ui is fixed
console.error = jest.fn();

jest.mock('robust-websocket');
RobustWS.mockImplementation(() => {});

configure({ adapter: new Adapter() });
