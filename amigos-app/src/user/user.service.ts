import { db } from "../utils/db.server"
import { APIError, HttpErrorCode } from "../utils/errors";

type UserData = {
    id: number;
    username: string;
    passwordHash: string;
    role: string;
    status: number;
};


// Get users from db
export const getAllUsers = async(): Promise<UserData[]> =>{
    try{
	return db.user.findMany({
	    select: {
		id: true,
		username: true,
		passwordHash: true,
		role: true,
		status: true,
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
export const getUsersById = async(received:number): Promise<UserData | null> =>{
    try{
	const user = await db.user.findFirst({
	    where:{
		id:received,
	    },
	});
	return user;
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
	const user = await db.user.findFirst({
	    where:{
		username: userName,
	    },
	});
	return user;
    }catch(error){
	throw new APIError(
	    "Failed to get users by name",
	    HttpErrorCode.INTERNAL_SERVER_ERROR,
	    null	    
	)
    }
};

// get user by status
export const getUsersByStatus = async(userStatus:number): Promise<UserData[] | null> =>{
    try {
	const users = await db.user.findMany({
            where:{
		status: userStatus,
            },
	    select: {
		id: true,
		username: true,
		passwordHash: true,
		role: true,
		status: true,
	    }
	});
	return users;
    } catch (error) {
	throw new APIError(
            "Failed to get users by status",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            error,
	);
    }    
};

// new user
export const createUser = async (
    user: Omit<UserData, "id">
    ): Promise<UserData> => {
    try{
        const { username, passwordHash, role, status} = user;
        return db.user.create({
            data: {
		username,
		passwordHash, 
		role,
		status,
            },
            select: {
		id: true,
		username: true,
		passwordHash: true, 
		role: true,
		status: true,
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
    user: Omit<UserData, "id">,
    id: number
  ): Promise<UserData> => {
    try{
        const { username, passwordHash, role, status } = user;
        const updated = db.user.update({
        where: {
            id,
        },
        data: {
            username,
            passwordHash,
	    role,
	    status,
        },
        select: {
            id: true,
            username: true,
            passwordHash: true,
            role: true,
	    status: true,
        },
        });
	return updated;
    }catch(errror){
        throw new APIError(
            "Failed to update user",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};

export const deleteUser = async (id: number): Promise<UserData> => {
  try {
    const deletedUser = await db.user.update({
	where: {
            id,
	},
	data: {
	    status: 0,
	},
    });
    return deletedUser;
  }catch (error) {
    throw new APIError(
      "Failed to delete user",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};
