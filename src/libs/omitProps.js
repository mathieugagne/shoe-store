import mapProps from 'recompose/mapProps';
import omit from 'lodash/omit';

const omitProps = keys => mapProps(props => omit(props, keys));

export default omitProps;
