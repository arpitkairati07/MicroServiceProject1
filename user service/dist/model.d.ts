import { Model } from "mongoose";
interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}
export declare const User: Model<IUser>;
export {};
//# sourceMappingURL=model.d.ts.map