import jwt from "jsonwebtoken"
import { ApiError } from "./ApiError.js";

export const verifyToken = (request) => {

    const token = request.cookies.get('access_token')?.values || '';
    if(!token) throw new ApiError(404, "token not found");

    const {id} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!id) throw new ApiError(400, "Unable to extraxct id from the access_token");

    return id;
}