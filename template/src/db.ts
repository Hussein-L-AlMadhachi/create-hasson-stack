import { PG_App } from 'pg-norm';
import { UsersTable } from "./models/users.js"
import { ProductsTable } from './models/products.js';
import { TransactionLedger } from "./models/accounts_transactions.js";



// Initialize your application
export const app = new PG_App({
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});



/**
 *  for CLI commands
 * 
 *     npm run db:create    # call .create() in all tables
 * 
 *     npm run db:alter     # call .alter() in all tables
 * 
 */




// register table for cli commands support
export const users = new UsersTable(app);
export const products = new ProductsTable(app);
export const transactions = new TransactionLedger(app);

app.register(users);
app.register(transactions);
app.register(products);



/**
 *  full connection options
 * 
 * {
 *      host                 : '',              // Postgres ip address[es] or domain name[s]
 *      port                 : 5432,            // Postgres server port[s]
 *      path                 : '',              // unix socket path (usually '/tmp')
 *      database             : '',              // Name of database to connect to
 *      username             : '',              // Username of database user
 *      password             : '',              // Password of database user
 *      ssl                  : false,           // true, prefer, require, tls.connect options
 *      max                  : 10,              // Max number of connections
 *      max_lifetime         : null,            // Max lifetime in seconds (more info below)
 *      idle_timeout         : 0,               // Idle connection timeout in seconds
 *      connect_timeout      : 30,              // Connect timeout in seconds
 *      prepare              : true,            // Automatic creation of prepared statements
 *      types                : [],              // Array of custom types, see more below
 *      onnotice             : fn,              // Default console.log, set false to silence NOTICE
 *      onparameter          : fn,              // (key, value) when server param change
 *      debug                : fn,              // Is called with (connection, query, params, types)
 *      socket               : fn,              // fn returning custom socket to use
 *      transform            : {
 *          undefined          : undefined,     // Transforms undefined values (eg. to null)
 *          column             : fn,            // Transforms incoming column names
 *          value              : fn,            // Transforms incoming row values
 *          row                : fn             // Transforms entire rows
 *      },
 *      connection           : {
 *          application_name   : 'postgres.js', // Default application_name
 *          ...                                 // Other connection parameters, see https://www.postgresql.org/docs/current/runtime-config-client.html
 *      },
 *      target_session_attrs : null,            // Use 'read-write' with multiple hosts to
 *                                              // ensure only connecting to primary
 *      fetch_types          : true,            // Automatically fetches types on connect
 *                                              // on initial connection.
 * }
 * 
 */


