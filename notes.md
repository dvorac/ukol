# Notes

This is just a scratchpad for thoughts and research I've had over the course of this project.

## Running Locally

I want to run the app locally with a single 'docker-compose' command. I would want each app component to run in a hot-reloading fashion, so I wouldn't have to restart them all every time to check small changes.

Now, I can do that just create a npm script to `yarn serve` the whole lot and having them run locally "on metal". However, that is too simple; it isn't really representative of the kind of effort I want to show in this project. I would like to practice the kind of skills and codebase management skills that would allow "local runs" to be as close as possible to remote runs.

## General Docker

It looks like a [consistently mentioned](https://news.ycombinator.com/item?id=32484008) [good idea](https://docs.docker.com/develop/dev-best-practices/) is to use a multi-stage `Dockerfile` to package the app but also exclude the excess weight (kB) of build-tooling.

## References

[Using Docker Compose with Nx Monorepo For Multi Apps Development](https://www.codefeetime.com/post/using-docker-compose-with-nx-monorepo-for-multi-apps-development/#why-use-docker-compose-with-nx-during-development-time)
A good article on running nx apps in docker. At least helps me understand that "linked volumes" are really the only way to go to enable HMR for any node apps.

[Using Profiles with Compose](https://docs.docker.com/compose/profiles/)
Profiles can enable or disable services. This is probably the best way to selectively start the database for local deployments, but avoid including it in remote deployments. I'd love to use this for adjusting whole service configs (frontend - dev w/HMR vs prod w/minified), however I'm not sure it's suited to that use-case.