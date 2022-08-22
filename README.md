# Elevatorian

This project is an exercise in several skills for my own professional software development expertise. I develop this project less to create new features for the app itself, but rather to practice meta-skills I know will be useful in professional software teams.

That said, this app is a simple elevator simulator. At it's simplest configuration, it simply shows a simulation of a bank of elevators, and produces some simple metrics for how those elevators perform (#number of passengers carried, etc.).

## Requirements

This project is a monorepo managed with [`nx`](https://nx.dev/). You will need to be able to run docker containers locally to run the app, with software such as [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/). You also need [`yarn`](https://yarnpkg.com/) to install dependencies and run the app locally.

```
yarn
```

## Getting Started

All app components can be run entirely from a single docker command
```
docker-compose up -d
```

or, you can run them locally thru `nx`
```
yarn nx run-many --target=build
yarn nx run-many --target=serve
```
When running thru NX, you will still need to setup your own local Postgres database instance.

## Feature List

See the [Github Project](https://github.com/users/dvorac/projects/1) for current features, and the next thing I'm working on.

