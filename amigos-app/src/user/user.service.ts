import { db } from "../utils/db.server"
import { APIError, HttpErrorCode } from "../utils/errors";

type UserData = {
    id: number;
    username: string;
    passwordHash: string;
    role: string;
    //sessions, ... aqui como procedemos? crear/importar el tipo Sessions?
};

// Get users from db
export const getUsers = async(): Promise<UserData[]> =>{
    try{
	return db.user.findMany({
	    select: {
		id: true,
		username: true,
		passwordHash: true,
		role: true,
		// sessions
	    },
	});	
    }catch(error){
	throw new APIError(
	    "Failed to get users",
	    HttpErrorCode.INTERNAL_SERVER_ERROR,
	    null
	)
    }
};

// Get user by id
export const getUsersById = async(id:number): Promise<UserData | null> =>{
    try{
	return db.user.findUnique({
	    where:{
		id,
	    },
	});
    }catch(error){
	throw new APIError(
	    "Failed to get users by id",
	    HttpErrorCode.INTERNAL_SERVER_ERROR,
	    null	    
	)
    }
};

// get user by username
export const getUsersByUserName = async(userName:string): Promise<UserData | null> =>{
    try{
	return db.user.findUnique({
	    where:{
		name: userName,
	    },
	});
    }catch(error){
	throw new APIError(
	    "Failed to get users by name",
	    HttpErrorCode.INTERNAL_SERVER_ERROR,
	    null	    
	)
    }
};

// get user by role
export const getUsersByRole = async(userRole:string): Promise<UserData | null> =>{
    try {
	const users = await db.user.findMany({
            where:{
		role: userRole,
            },
	});
	return users;
    } catch (error) {
	throw new APIError(
            "Failed to get users by role",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            error,
	);
    }    
};

// get user by session?


// new user
export const createUser = async (
    user: Omit<UserData, "id">
    ): Promise<UserData> => {
    try{
        const { username, passwordHash, role} = user;
        return db.user.create({
            data: {
		username,
		passwordHash, 
		role, 
            },
            select: {
		id: true,
		username: true,
		passwordHash: true, 
		role: true, 
            },
        });
    }catch(errror){
        throw new APIError(
            "Failed to store user on db",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};

// update user with id
export const updateUserById = async (
    product: Omit<UserData, "id">,
    id: number
  ): Promise<UserData> => {
    try{
        const { username, passwordHash, role } = user;
        return db.user.update({
        where: {
            id,
        },
        data: {
            username,
            passwordHash,
	    role,
	    //sessions
        },
        select: {
            id: true,
            username: true,
            passwordHash: true,
            role: true, 
	    // sessions
        },
        });
    }catch(errror){
        throw new APIError(
            "Failed to update user",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};
  

// delete with id
export const deleteUserById = async (id: number): Promise<string> => {
    try{
        await db.user.delete({
        where: {
            id,
        },
        });
        return "User deleted succesfully";
    }catch(errror){
        throw new APIError(
            "Failed to delete user",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};
