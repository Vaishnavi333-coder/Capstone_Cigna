import { Policy } from '../policies/policy.entity';
import { Claim } from '../claims/claim.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    policies: Policy[];
    claims: Claim[];
}
