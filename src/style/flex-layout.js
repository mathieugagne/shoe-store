export const layout = `
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
`;

export const layoutHorizontal = `
    ${layout};
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
`;

export const layoutVertical = `
    ${layout};
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
`;

export const layoutWrap = `
    -ms-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
`;

export const layoutFlex = `
    -ms-flex: 1 1 0.000000001px;
    -webkit-flex: 1;
    flex: 1;
    -webkit-flex-basis: 0.000000001px;
    flex-basis: 0.000000001px;
`;

export const layoutAroundJustified = `
    -ms-flex-pack: distribute;
    -webkit-justify-content: space-around;
    justify-content: space-around;
`;
