import styled from 'styled-components';

const InventoryLevelColor = styled.div `
    width: 20px;
    height: 20px;
    font-size: 13px;
    color: #ffffff;
    text-align: center;
    border-radius: 25px;
    background-color: ${ props => {
        if (props.inventory > 10) {
            return '#03A9F4';
        } else if (props.inventory <= 10 && props.inventory > 0) {
            return '#FF9800';
        } else if (props.inventory === 0) {
            return '#F44336';
        }
    }};
`;

export default InventoryLevelColor;