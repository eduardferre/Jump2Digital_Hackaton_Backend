# Jump2Digital_Hackaton_Backend

## Packages installation

fnm installation (needs Rust): https://github.com/Schniz/fnm
rust installation: https://www.rust-lang.org/tools/install

Installation of Node.js (20.9.0): `fnm install 20.9.0`

Initialization of NPM: `npm init`

Required dependencies: `npm install`

## REST API

The REST API has been developed by using NodeJS and following a MVC architecture. The `skins` model and controller are implemented, however, the view has not been created yet.
The server can be initialized by `npm run dev` or `npm run start`

## MySQL DATABASE

To initialize the database with the table required, first create a MySQL connection. Once the connection is done, you can initialize the script in db/scripts to create the databade and table.

## API Utilization

The default port is 3001, so, when the application starts the petitions should point: `http://localhost:3001/skins/` adding the corresponding resource that is wanted to be accessed. However, using the `REST Client` extension in VSCode and the file `api.http` the petitions are already declared for testing.
Since database is empty when initialized, some skins should be inserted...