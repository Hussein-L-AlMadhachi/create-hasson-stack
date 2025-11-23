/**
 * this is an example of using an normal plain tables in PG-NORM with builtin contraints in PostgreSQL
**/



import { PG_Table, PG_App } from "pg-norm";
import {app} from "../db.js";



export class ProductsTable extends PG_Table {
    

    constructor(pg_app: PG_App) {

        //       app  , table_name ,        visible columns
        super( pg_app , 'products' ,  ['name', 'price', 'category']  );

        // the code above sets the properies visibles , table_name for you

        /** visible columns are visible to insert(), update(), list(), fetch() methods
         *  you get those methods by default for basic CRUD operations
        **/

        // changing the maximum data this.list() can fetch
        // this.max_rows_fetched = 50; /*(this is the default)*/

    }


    /**
     *  this is used to create the actual up to date SQL table for your app in new
     *  instances of the database.
     *
     *  NOTE:
     *    always keep this up to date with your schema so you can make new database instances
     *    for your app.
    **/
    public async create() {

        // it is very important to create column named id
        await this.sql`
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            category VARCHAR(50),
            in_stock BOOLEAN DEFAULT true
        )
        `;
    }


    /* this is what you use to bring your current database instance up to date
     *  with the latest changes you want to make to your schema
    **/
    public async alter(){
        // your code goes here
        // if you don't have any changes to the schema remove this method for now
    }


    // write your own methods to custom queries per your need
    // override list(), fetch(), insert(), update() methods to change their behavoir 
    // note that all of those are async methods

    /*  when you define your own methods you can use this.visibles and this.table_name
        for consistency, compatibilty and better security  */
}




/**
 *  import products now and use the following methods for basic CRUD
 *  
 *  await products.listAll()            // list all the rows of the table                  (only displays data in visible columns)
 *  await products.fetch( 1 )           // fetch visible columns for user with id 1        (only displays data in visible columns)
 *  await products.list( 50 , 2 )       // list second 50 rows of the table                (only displays data in visible columns
 *                                                                                          and cannot fetch more than max_rows_fetched
 *                                                                                          rows but as you can change it above in the
 *                                                                                          constructor of the table)
 *
 *  await products.update( 1 , {...} )  // change columns data for user with id 1          (only applies to data in visible columns) 
 *  
 *  await products.insert( {...} )      // insert a new rows and fill the column with data (only lets you insert visible columns, 
 *                                                                                          but if PG_AuthTable is used you can fill a
 *                                                                                          password field)
 *
 *  await products.delete( 1 )          // delete user with id 1
 *
**/

