# mysql-codespace-devcontainer

## Using codespace
To login into the database, use `mysql -u root -pmariadb -h 127.0.0.1`

## Setup database 
To setup database, run in bash terminal: `mysql -h 127.0.0.1 -u root -pmariadb --skip-ssl < schema.sql`
To create sample data, run in bash terminal: `mysql -h 127.0.0.1 -u root -pmariadb --skip-ssl < data.sql`