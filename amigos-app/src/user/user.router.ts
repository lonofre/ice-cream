import express, { Request, Response, NextFunction } from "express";
import { adminLoginAuth, loginAuth } from "../middleware/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { body, validationResult } from "express-validator";

import * as UserService from "./user.service";

export const userRouter = express.Router();

// userRouter.get(
//   "",
//   loginAuth,
//   async (request: Request, response: Response, next: NextFunction) => {
//     const users = await UserService.getAllUsers();
//     return response.status(200).json(users);
//   }
// );

userRouter.get(
  "/",
  loginAuth,
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await UserService.getActiveUsers();
    return response.status(200).json(users);
  }
);

// GET: Users by Role
userRouter.get(
  "/:role",
  loginAuth,
  async (request: Request, response: Response) => {
      const role:string = request.params.role;
      const users = await UserService.getUsersByRole(role);
    response.send(users);
  }
);

// GET: A single user by ID
userRouter.get(
  "/:id",
  loginAuth,
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const user = await UserService.getUserById(id);
    if (user) {
      return response.status(200).json(user);
    }
    throw new APIError("User not found", HttpErrorCode.NOT_FOUND, null);
  }
);

userRouter.post(
  "/",
  adminLoginAuth,
    body("username").isString(),
    body("passwordHash").isString(),
    body("role").isString(),
    body("status").isNumeric(),
    async (request: Request, response: Response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
	    throw new APIError(
		"Verify the data and try again",
		HttpErrorCode.BAD_REQUEST,
		null
	    );
	}

    const { username, passwordHash, role, status } = request.body;

    const newUser = {
	username,
	passwordHash,
	role,
	status,
    };
    const savedUser = await UserService.createUser(newUser);
    return response.status(201).json(savedUser);
  }
);

userRouter.put(
  "/:id",
  adminLoginAuth,
  body("username").isString(),
  body("passwordHash").isString(),
  body("role").isString(),
  body("status").isNumeric(),
    async (request: Request, response: Response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
	    throw new APIError(
		"Verify the data and try again",
		HttpErrorCode.BAD_REQUEST,
		null
	    );
	}

    const id: number = parseInt(request.params.id, 10);
    const { username, passwordHash, role, status } = request.body;

    const newUser = {
	username,
	passwordHash,
	role,
	status,
    };
    const savedUser = await UserService.updateUserById(newUser, id);
    return response.status(201).json(savedUser);
  }
);

// DELETE: Delete an user based on the id
userRouter.delete(
  "/:id",
  adminLoginAuth,
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const deletedUser = await UserService.deleteUser(id);
    const userName = deletedUser.username;
    const message = `The user ${userName} was deleted successfully`;
    return response.status(200).json({ message });
  }
);
