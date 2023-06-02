import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";

type UserData = {
    id: number;
    username: string;
    passwordHash: string;
    role: string;
    status: number;
};

export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const users = await db.user.findMany({
      select: {
          id: true,
	  passwordHash: true,
          username: true,
          role: true,
	  status: true,
        },
    });
    return users;
  } catch (error) {
    throw new APIError(
      "Failed to get users",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};

export const getActiveUsers = async (): Promise<UserData[]> => {
  try {
    const users = await db.user.findMany({
	where: { status: 1 },
      select: {
          id: true,
	  passwordHash: true,
          username: true,
          role: true,
	  status: true,
        },
    });
    return users;
  } catch (error) {
    throw new APIError(
      "Failed to get users",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};


export const getUserById = async (
  receivedId: number
): Promise<UserData | null> => {
  try {
    const user = await db.user.findFirst({
      where: {
        id : receivedId,
        status: 1,
      },
    });
    return user;
  } catch (error) {
    throw new APIError(
      "Failed to get users by id",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};

export const getUsersByRole = async (
  roleC: string
): Promise<UserData[]> => {
  try {
    const users = await db.user.findMany({
      where: {
	  role: roleC,
          status: 1,
      },
    });
      return users;
  } catch (error) {
      throw new APIError(
	  "Failed to fetch users by category",
	  HttpErrorCode.INTERNAL_SERVER_ERROR,
	  null
      );
  }
};

export const createUser = async (
  user: Omit<UserData, "id">
): Promise<UserData> => {
  try {
    const { username, passwordHash, role, status } = user;
    const savedUser = await db.user.create({
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
    return savedUser;
  } catch (error) {
    throw new APIError(
      "Failed to create and save user on database",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};

// Update an existing user in the database
export const updateUserById = async (
  user: Omit<UserData, "id">,
  id: number
): Promise<UserData> => {
  try {
    const { username, passwordHash, role, status } = user;
    const updatedUser = await db.user.update({
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
    return updatedUser;
  } catch (error) {
    throw new APIError(
      "Failed to update user",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};

// Deletes a user in the database by setting status to 0
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
  } catch (error) {
    throw new APIError(
      "Failed to delete user",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};
