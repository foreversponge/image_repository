import knex from 'knex';


const db = knex({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : 'mysql1',
    database : 'images',
  }
});

export default db;