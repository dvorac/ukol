# Ukol

This project is my personal Todo app. "úkol" means "task" in Czech.

This project is an exercise in several skills for my own professional software development expertise. I develop this project less to create new features for the app itself, but rather to practice meta-skills I know will be useful in professional software teams.

That said, this app is a simple elevator simulator. At it's simplest configuration, it simply shows a simulation of a bank of elevators, and produces some simple metrics for how those elevators perform (#number of passengers carried, etc.).

## Requirements

This project is a monorepo managed with [`nx`](https://nx.dev/). You will need to be able to run docker containers locally to run the app, with software such as [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/). You also need [`yarn`](https://yarnpkg.com/) to install dependencies and run the app locally.

```bash
yarn
```

## Getting Started

There are two options to run locally, 
1. via containers with `docker-compose`, 
1. or running each app individually via NX.

### Docker

All app components can be run entirely from a single docker command:
```bash
docker-compose up -d
```

### NX

1. Build entire project:
    ```bash
    yarn nx run-many --target=build
    ```
1. Spin up the Postgres instance via Docker:
    ```bash
    docker-compose up -d db
    ```
1. Migrate db to current schema:
    ```bash
    DB_CONNECTION_STRING=postgresql://postgres:postgres@localhost:5432/ukol yarn nx run data:migrate
    ```
1. Serve* `api` project:
    ```bash
    yarn nx run api:serve:development
    ```
1. Serve* `server` project, the frontend host:
    ```bash
    yarn nx run server:serve:development
    ```
1. Serve* `web` project, the React frontend:
    ```bash
    yarn nx run web:serve:development
    ```
> *Each of these steps will probably need to be run in it's own shell.

## Feature List

See the [Github Project](https://github.com/users/dvorac/projects/1) for current features, and the next thing I'm working on.

