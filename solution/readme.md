# Solution
> Hi Potlocers, thank you for providing me this challenge. This was fun and took little longer and i needed to pick my battles.

> I spent time in organizing my code from maintainability perspective, tests are added just for illustration purpose, haven't spend much time in styling or testing.
___

## Features (👋 Welcome to aldo inventory)
> Below is the snapshot of what was added to pull request.

* Set of api and realtime (almost) sockets to monitor inventory list for Aldo stores
* Api to list all stores
* Api to list products inventory for all stores
* Websocket connection for consumer
* Realtime updated for consumer for inventory change

*As a hack we are using **scheduled task** to simulate inventory change over time*

## Tech Stack

* Api powered by node and express using Nestjs
    * configuration using env
    * scaffold data migrations has been added
    * for state persistence postgres is used with typeOrm
    * api is running at port 3000 (configurable)
    * hardcoded socket address and event data
    * skipped open api swagger installation

* UI powered by react and nextjs
    * Realtime updates
    * Opinionated organization
    * UI is running at port 3001 (hardcoded)
    * Hardcoded minimum count for units_in_stock (this could be config api, for demo purpose i have avoided this)
    * Testing tooling with react testing library
    * Hardcoded api for illustration purpose
    * skipped alerting for api errors

* dockerfile and docker-compose for local setup

## Run Locally

* ``` docker-compose up ```
* ``` http://localhost:3001 ```
