import React from 'react';
import CardContainers from './CardContainers';
import ShopsTableContainer from './ShopsTableContainer';
import ShopTableContainer from './ShopTableContainer';
import Filters from './Filters';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <CardContainers />
                <Filters />
                <ShopsTableContainer />
                <ShopTableContainer />
            </div>
        );
    }
}