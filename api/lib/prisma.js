import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // object definition of a client

export default prisma;// an export made to be retrieved from the auth.controller while creating a user 
