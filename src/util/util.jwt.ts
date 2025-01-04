import {IDecodedAuthToken} from "../model/IDecodedAuthToken";

export const decodeToken = (token:string) =>{
    const payLoadBase64 = token.split(".")[1];
    return JSON.parse(atob(payLoadBase64)) as IDecodedAuthToken;
}

