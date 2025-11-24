import { users } from "../db.js";
import type {Metadata} from "enders-sync";



export async function registerUser( data:any ) {
    delete data["id"];
    delete data["created_at"];

    data["role"] = "viewer";
    const [uid] = await users.insert( data );

    return uid;
}




export async function registerAdmin( metadata:Metadata , name:string , email:string , password:string ) {

    const [uid] = await users.insert( { name , email , role:"admin" , password } );

    return uid;
}




export async function update( metadata:Metadata , data:any ) {
    delete data["created_at"];

    if ( data.role !== undefined ) {
        throw new Error("unauthorized");
    }

    const uid = metadata.auth.user_id;
    if ( typeof uid !== "number" ){
        throw new Error ("Unexpected error: user_id cannot be anythin but a number");
    }

    await users.update( uid , data );

    return uid;
}



export async function deleteUser( metadata:Metadata , id:number ) {
    await users.delete( id );
}



export async function getProfile( metadata:Metadata ){
    const uid = metadata.auth.user_id;

    if ( typeof uid !== "number" ){
        throw new Error ("Unexpected error: user_id cannot be anythin but a number");
    }
    const [result] = await users.fetch( uid );
    
    if ( !result ) {
        throw new Error( "no user found" );
    }

    return result;
}

