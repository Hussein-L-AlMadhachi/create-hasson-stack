/**
 * this is an example of using a PG-NORM auth table with builtin auth functions in PostgreSQL
**/


import { PG_App , PG_AuthTable } from "pg-norm";



/**
 * NOTE:
 *   keep "role" and "id" in the UsersTable for the auth to work as expected if you don't want to change "modules/auth.ts" and "services/profile.ts"
**/



export class UsersTable extends PG_AuthTable {

    constructor(pg_app: PG_App) {

        //      app  , table_name ,           visible columns             ,  identify user by
        super( pg_app, 'users', [ "id" , 'name', 'email', 'age' , "role"] ,      "email"       );

        // the code above sets the properies visibles , table_name and identify_user_by for you

        /*  identify_user_by field is anything you use to login, it can be email, phone_number 
            SSN, or the username. 

            the default value for identify_user_by if the feild was left empty in super() above */

    }

    public async create() {

        // it is very important to create column named id
        await this.sql`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            role VARCHAR(20) NOT NULL,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            age INTEGER,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
        `;
    }

    /*  write your own methods to custom queries per your need
     *  override list(), fetch(), insert(), update() methods to change their behavoir 
     *  note that all of those are async methods
    */

    /*  when you define your own methods you can use this.visibles, this.table_name and this.identify_user_by
        for consistency, compatibilty and better security  */
}



/**
 *   now you can import users and use all the methods that can be used PG_Table are available in PG_AuthTable
 *   with some notes:
 *   
 *      1. you need to create a field called `password_hash` and the user identifying field you specified 
 *          in "identify user by" field (in this case the field call "username" so you need to create a
 *           field called username) as shown in create().
 *  
 *      2. when you insert rows you can fill a field called `password` (insert will hash it for you but don't 
 *                                                                    create this column in database)
 *
 *      3. update() cannot update passwords (unless you change it to do it which is very discouraged)
 *      4. to update password you use updatePassword( id , new_plaintext_password ) method
 *      5. to verify passwords you can use verifyPassword( id , plaintext_password )
 *
 * 
 * 
 *   in conclusion you have 3 methods extra methods (one overwritten):
 * 
 *      await products.insert( {...} );    // insert a new rows and fill the column with data (only lets you insert visible columns, 
 *                                                                                             but with additional "password" field that
 *                                                                                             will be hashed and added for you)
 *
 *      await updatePassword( 1 , "pass123" );    // update password to "pass123" of user with id 1
 *
 *      await verifyPassword( "ali@email.com" , "pass123" );   // verify the password of the user identified with "ali@email.com" and
 *      await fetchAfterAuth( "ali@email.com" , "pass123" , ["id" , "role"] );    // update password to "pass123" of user with id 1
 *      await idAfterAuth( "ali@email.com" , "pass123");    // update password to "pass123" of user with id 1
 *                                                                check if it equals "pass123" 
 *
**/


