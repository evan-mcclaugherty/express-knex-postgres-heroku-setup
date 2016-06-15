# Boilerplate for a knex CRUD app

## _important:_ The commands for all these steps are at the bottom if you don't know them.

1. cd into clone && run npm install.
2. Create a local db.
3. Change knexfile.js to reflect your local db name.
4. Create a heroku app && postgresql addon.
5. put your heroku-postgresql url in the .env_example and **rename file** right away to .env.
6. Run knex commands to make migrations && seeds.
7. Migrate latest!
8. Don't forget to migrate to heroku.
9. Enjoy!

# Steps on how I setup this CRUD project

##### Create Express App
- `express --hbs name_of_app` creates new express app in a directory called name_of_app
  * `--hbs` adds handlebars
  * assumes you have [express-generator](https://www.npmjs.com/package/express-generator) package installed globally (`npm install -g express-generator`)
- `cd name_of_app && npm i`
  * `npm i` intalls all dependencies denoted by package.json

##### Set UP Knex
- `npm i -S pg knex` installs pg & knex, & adds both to the dependencies in package.json
  * in 'index.js' file, add `var pg = require('pg');`
  * [pg](https://www.npmjs.com/package/pg) is a module that lets you connect to psql; must be installed on a per project basis
  * assumes you have [knex](https://www.npmjs.com/package/knex) package installed globally (`npm i knex -g`)
- `knex init` creates 'knexfile.js' in root directory

##### Initialize Git & Set Up .env File
- `git init` initializes git repo
- `echo node_modules > .gitignore` to add node modules to a .gitignore file OR if you have [gitignore](https://www.npmjs.com/package/gitignore) installed globally, use command `gitignore node`
- `npm i -S dotenv` installs [dotenv](https://www.npmjs.com/package/dotenv) module & adds to dependencies in package.json, which loads environment variables from a .env file into process.env
- `touch .env` in root directory to create empty .env file
  * add 1 key-value pair per line; when assigning multiple values to one key, separate with `:`
  * this is where we define `DATABASE_URL=yourURL` later
  * add `require('dotenv').config();` to top of 'knexfile.js', so that we can access the `DATABASE_URL` variable through `process.env` when we define our production environment connection
- `echo .env >> .gitignore` adds .env file to .gitignore so git doesn't track it
  * Why? Because we are going to set the `DATABASE_URL` variable equal to our heroku URL, which contains a password that we don't want others to see

##### Set Up Heroku App & Database
- `createdb [name_of_app]` creates psql database locally
- `heroku apps:create name_of_app` creates a heroku app
- `heroku addons:create heroku-postgresql --app name_of_app` adds postgresql database to the app
- `heroku config` returns the URL
  * add URL to .env file `DATABASE_URL=yourURL?ssl=true`
- In root directory, add a folder called 'db' & create 'knex.js' inside it
  * refer to 'db/knex.js' in this repo for how to define your environment configurations
- create a repo on github & `git remote add origin ssh_of_repo` to add the remote
- `git add/commit/push` to github
- if you want to open a psql shell :shell: to the heroku database & run sql commands in the terminal: `heroku pg:psql --app name_of_app`

##### Migrating & Seeding
- `knex migrate:make table_name` to create a new migration
  * this creates a folder called 'migrations' with a new 'timestamp_table_name.js' file
  * Each time you change the table you will need to rerun this command & change the contents of the js file
- `knex migrate:latest` runs knex migration locally (whatever development environment is set to)
- `knex seed:make seed_name` to create a new seed  :seedling:
  * this creates a folder called 'seeds' with a new 'timestamp_seed_name.js' file
- `knex seed:run` to run seed the local database

If deploying to heroku,
- `knex migrate:latest --env production` runs knex migration locally against heroku database in the cloud
- `knex seed:run --env production` runs knex locally & puts seed data in heroku database
- `git push heroku master` to push to heroku :tada::balloon::confetti_ball:
