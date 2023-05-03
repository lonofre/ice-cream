import express, { Request, Response } from "express";
import {
    adminLoginAuth,
    loginAuth,
    tabletMasterLoginAuth,
} from "../middleware/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { handleLogin } from "../login/login.service";
import { body, validationResult } from "express-validator";

import * as UserService from "./user.service"

/* ROuter instance */
export const userRouter = express.Router();

/* User Endpoints */

/** Getters 
 * users
 * users by id
 * users by role
 */
userRouter.get("/users/", loginAuth, async (request: Request, response: Response) => {
    const users = await UserService.getUsers();
    return response.status(200).json(users);
});

userRouter.get("/user/:id", loginAuth, async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const user = await UserService.getUserById(id);
    if (user) {
        return response.status(200).json(user);
    }
    throw new APIError(
        "User not found",
        HttpErrorCode.NOT_FOUND,
        null,
    ); 
});

userRouter.get("", loginAuth, async (request: Request, response: Response) => {
    const roleName = request.params.role;
    const user = await UserService.getUserByUserName(roleName);
    
    if (user) {
        return response.status(200).json(user);
    }
    throw new APIError(
        "Users not found with role: ".concat(roleName),
        HttpErrorCode.NOT_FOUND,
        null,
    ); 
    
});

/**
 * Post
 */
userRouter.post(
    "/",
    adminLoginAuth,
    body("username").isString(),
    body("passwordHash").isString(),
    body("role").isString(),
    // body("sessions").is?(),
    async (request: Request, response: Response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
            throw new APIError(
		"Verify the data and try again",
		HttpErrorCode.BAD_REQUEST,
		null
            );
	}
	
	const {name, description, image, price, categoryName} = request.body;		
	const newUser = {username, passwordHask, role};
	const created = await UserService.createUser(newUser);
	return response.status(201).json(created);
    }
);

/**
 * Put 
 */
usertRouter.put(
    "/:id",
    adminLoginAuth,
    body("username").isString(),
    body("passwordHash").isString(),
    body("role").isString(),
    // sessionsn
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
      const { username, passwordHash, role } = request.body;
  
      const newUser = { name, passwordHash, role};
      const saved = await UserService.updateUserById(newUser, id);
      return response.status(201).json(saved);
    }
  );

/**
* Delete
*/
userRouter.delete("/:id", adminLoginAuth, async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const deleted = await UserService.deleteUserById(id);
    return response.status(204).json(deleted);
  });
