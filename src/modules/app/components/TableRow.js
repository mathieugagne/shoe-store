import styled from 'styled-components/macro';

const TableRow = styled('tr')`
  height: 50px;
  border: 0;
  :first-child {
    background-color: #d8d8d8;
  }
  :nth-child(2n) {
    background-color: ${props => props.theme.backgroundContrast};
  }
`;

export default TableRow;
