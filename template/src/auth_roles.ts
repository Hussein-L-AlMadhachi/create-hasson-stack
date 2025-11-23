import { generateRoleAuth } from "./modules/auth.js";

export const authValidator = {
    admin: generateRoleAuth("admin"),
    users: generateRoleAuth("users"),
}
