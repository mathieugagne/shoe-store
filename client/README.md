# shoe-store client

## Pre-requisite

    $ node
    $ yarn
    
    # Refer [Server README.md](../server/README.md) for more details
    $ websocketd

## Quick video walk through
[![Video](https://user-images.githubusercontent.com/446864/43681624-4a80c1f8-9816-11e8-8926-e34fce197487.jpg)](https://youtu.be/fpu6O491Z94)

## Code coverage
![Code coverage](https://user-images.githubusercontent.com/446864/43681380-39445028-980f-11e8-9788-904c3161985a.png)

## Commands

    # start client server
    $ yarn start 
    
    # start client and server 
    $ yarn start-with-backend

    # generate production build
    $ yarn build

    # run test
    $ yarn test

    # run coverage
    $ yarn test:coverage
  
## Disclaimer

  - There is an issue being actively worked in [material-ui](https://github.com/mui-org/material-ui/issues/12159). You will notice some warning in console. Please ignore them for now.
  - Test on MAC + Chrome

## Improvement

  - Increase unit test coverage
  - Add option to transfer inventory
