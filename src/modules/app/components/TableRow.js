import styled from 'styled-components';

const TableRow = styled('tr')`
  height: 50px;
  border: 0;
  :nth-child(2n) {
    background-color: ${props => props.theme.backgroundContrast};
  }
`;

export default TableRow;
