# Setup  
| Task                          | Command                               |
|:------------------------------|:--------------------------------------|
| Installing yarn               | ```npm install --global yarn```       |
| Installing NestJS CLI         | ```yarn global add @nestjs/cli```     |
| Scaffolding a new application | ```nest new nestjs-task-management``` |

# Creating a Tasks module
```nest g module tasks```  
More about generation: ```nest g --help```  

Postgres Docker
```docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres```