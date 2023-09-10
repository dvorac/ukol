## Directory Organization

The intention here is to have shared infra components of the app (vpc, subnets, acm, etc.) in the "top-level" directory. Then have app-specific components within sub-directories per-app, e.g. "app", "web", etc.

Files in each directory are organized by cloud component, e.g. "ecs", "alb", etc.

Nested directories necessitate a "module" structure added to the files themselves. This is a limitation of terraform - it does not "flatten" a directory structure into a list of resources to manage all at once. 

https://discuss.hashicorp.com/t/splitting-out-main-tf-into-separate-folders/21175/3