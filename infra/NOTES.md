# notes

## references

https://spacelift.io/blog/terraform-ecs

https://spacelift.io/blog/terraform-alb

https://github.com/jimmysawczuk/terraform-fargate-tutorial/blob/main/ecs.tf

https://github.com/sumeetninawe/tf-alb/blob/main/alb.tf

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/verify-connectivity.html

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/standalone-task-create.html

https://medium.com/@olayinkasamuel44/using-terraform-and-fargate-to-create-amazons-ecs-e3308c1b9166

https://www.google.com/search?q=terraform+aws_ecs_task_definition+vs+aws_launch_template&sca_esv=3ddc15aac6af2d0d&sxsrf=ADLYWILSM-Y0Ezu4prvM4nimIjby2T0Rjw%3A1733412497907&ei=kcZRZ8-EN6P-p84PqPSVyQg&ved=0ahUKEwiPkb_h-JCKAxUj_8kDHSh6JYkQ4dUDCA8&uact=5&oq=terraform+aws_ecs_task_definition+vs+aws_launch_template&gs_lp=Egxnd3Mtd2l6LXNlcnAiOHRlcnJhZm9ybSBhd3NfZWNzX3Rhc2tfZGVmaW5pdGlvbiB2cyBhd3NfbGF1bmNoX3RlbXBsYXRlMggQIRigARjDBEjCB1DbAljbAnABeAGQAQCYAWWgAWWqAQMwLjG4AQPIAQD4AQGYAgKgAmzCAgoQABiwAxjWBBhHmAMAiAYBkAYIkgcDMS4xoAfFAw&sclient=gws-wiz-serp

https://akhil-ghatiki.medium.com/running-a-new-task-using-terraform-without-a-service-in-aws-ecs-f815434d28c7

https://stackoverflow.com/questions/76899023/rds-while-connection-error-no-pg-hba-conf-entry-for-host

https://medium.com/warp9/get-started-with-aws-ecs-cluster-using-terraform-cfba531f7748

https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ecs_task_execution

google: "terraform aws ecs standalone one-off task"

## learning and todo

fargate needs special config vs. ec2 in an ecs cluster. the two are not capatible.

template files seems a good way to handle task definitions, check them out

use terraform aggregation / group operators (like group-creating subnets)

security:
- lockdown security groups
- waf
- have terraform create more limited IAM roles for ECS
- tighten abilities of github IAM role
- enable SSL across web/api/rds boundaries
- enforce more verbose logging
- secure the docker credentials in github action:
  >  Run aws-actions/amazon-ecr-login@v1
  >    
  >  Warning: Your docker password is not masked. See https://github.com/aws-actions/amazon-ecr-login#docker-credentials for more information.
  >  Logging into registry 115183919983.dkr.ecr.us-east-1.amazonaws.com

ci/cd
- 

# running migrate

after new Docker images have been published, run github workflows with the `gh` cli:

deploy:
```
gh workflow run 'Ukol SDLC - Infra Deploy' --ref <working_branch_name> -f target=unused
```
then run the db schema `migrate` ecs task manually (AWS console > ECS cluster > Tasks > Run Task...)
---
after you are done testing, teardown the env with the other github workflow:
```
gh workflow run 'Ukol SDLC - Infra Teardown' --ref <working_branch_name> -f target=unused
```

## todo
- run (auto?) when new infra is deployed
- run when new containers are deployed
- run arbitrarily

