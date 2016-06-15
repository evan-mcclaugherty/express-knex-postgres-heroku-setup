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

- `express --git --hbs [name_of_app]`
- `cd [intro_to_knex] && npm i`
  * `npm i` writes the package.json file for you (add `-y` to accept defaults)
- `npm i -S pg knex` installs pg & knex locally (do this on a per project basis) & adds both to the dependencies in package.json
  * pg is a module that lets you connect to psql
- `knex init` creates knexfile.js in root directory
- `git init` initializes git repo
- `npm i -S dotenv`
- `touch .env` in root directory
  * add 1 key-value pair per line; when assigning multiple values to one key, separate with `:`
  * this is where we define `DATABASE_URL=yourURL`
  * add `require('dotenv').load();` to top of knexfile.js, so that we can use the `DATABASE_URL` variable when we define our production environment connection
- `echo .env >> .gitignore` adds .env file to .gitignore so git doesn't track it
  * Why? Because we are going to set the `DATABASE_URL` variable equal to our heroku URL, which contains a password that we don't want others to see
- `createdb [name_of_app]` creates psql database


- **create a heroku app: heroku apps:create name_of_app**
- **add a db to the app: heroku addons:create heroku-postgresql**
- **get the URL: heroku config**
- put that URL in .env
- create a folder db and file knex.js
- git remote add origin ssh_of_repo (create a repo)
- git add/commit/push to github
- **add migrations: knex migrate:make migration_name**
- once finished run knex migrate:latest
- **for your heroku app now run:**

  - **knex migrate:latest --env production**

- **seed your db: knex:seed seed_name**
  - **run with knex seed:run**

- To deploy to heroku: git push heroku master.
