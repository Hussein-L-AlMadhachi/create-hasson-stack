import express from 'express';
import { createRPC } from 'enders-sync';

import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

import { login } from './modules/auth.js';
import { registerViewer , registerAdmin , update , deleteUser , getProfile } from "./services/profile.js";
import { authValidator } from './auth_roles.js';



export const app = express();
app.use(express.json());

// Create a public RPC instance (no authentication required)
export const publicRPC = createRPC(app, '/api/public', () => ({
    success: true
}));

publicRPC.add( login );
publicRPC.add( registerViewer )
publicRPC.add( registerAdmin )



// Admin RPC instance
export const adminsRPC = createRPC(app, '/api/admin' , authValidator.admin );
adminsRPC.add( update )
adminsRPC.add( deleteUser )
adminsRPC.add( getProfile )



// Users RPC instance
export const usersRPC = createRPC(app, '/api/users' , authValidator.users );
usersRPC.add( update )
usersRPC.add( deleteUser )
usersRPC.add( getProfile )


