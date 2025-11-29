import { User } from '../users/user.entity';
import { Claim } from '../claims/claim.entity';
export declare class Policy {
    policyId: number;
    user: User;
    insurer: string;
    policyType: string;
    premiumAmt: number;
    startDate: string;
    endDate: string;
    status: string;
    claims: Claim[];
}
