/**
 * this is an example of using an immutable ledger in PG-NORM with builtin contraints in PostgreSQL
**/

import { PG_App , PG_Ledger } from "pg-norm";
import {app} from "../db.js";





export class TransactionLedger extends PG_Ledger {

    constructor(pg_app: PG_App) {

        //       app  ,   table_name   ,                  visible columns
        super( pg_app , 'transactions' , ['from_account', 'to_account', 'amount', 'type']);

    }

    // beware that the name of the create function is different here
    public async createTable() {
        await this.sql`
        CREATE TABLE transactions (
            id SERIAL PRIMARY KEY,
            from_account INTEGER NOT NULL,
            to_account INTEGER NOT NULL,
            amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
            type VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
        `;
    }

}






/* ✅ Allowed methods (doumented above)

await transactions.insert({ from_account: 1, to_account: 2, amount: 100, type: 'transfer' });
await transactions.listAll();
await transactions.list( 50 , 2 );
await transactions.fetch( 1 );


❌  Throws error: ledgers are immutable

    await ledger.update(1, { amount: 200 });
    await ledger.delete(1);
*/

