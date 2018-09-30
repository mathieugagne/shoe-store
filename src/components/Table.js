import styled from 'styled-components';

export const Table = styled.table`
    width:100%;
    text-align:center;
    border-spacing: 1;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
`;

export const TheadTr = styled.tr `
    height: 60px;
    background: #36304a;
`;

export const TbodyTr = styled.tr `
    height: 50px;
    font-size: 15px;
    color: #808080;
    line-height: 1.2;
    font-weight: unset;
    
    :last-child {
        border: 0;
    }

    :nth-child(even){
        background-color: #f5f5f5;
    }

    :hover{
        color: #555555;
        background-color: #f5f5f5;
    }
`;

export const Td = styled.td `
    padding-left: 8px;
`;

export const Th = styled.th `
    padding-left: 8px;
`;

export const TheadTh = styled.th`
    font-size: 18px;
    color: #fff;
    line-height: 1.2;
    font-weight: unset;
`;

