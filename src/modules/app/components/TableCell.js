import styled from 'styled-components/macro';

const TableCell = styled('td')`
  text-align: left;
  padding: ${props => props.theme.gutter}px;
  border: 0;
`;

export default TableCell;
