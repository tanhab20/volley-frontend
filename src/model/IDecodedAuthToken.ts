import {IUser} from "./IUser";

export interface IDecodedAuthToken {
    user: IUser;
    exp: number;
    iat: number;
}
