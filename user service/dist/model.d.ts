import { Model } from "mongoose";
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}
export declare const User: Model<IUser>;
//# sourceMappingURL=model.d.ts.map