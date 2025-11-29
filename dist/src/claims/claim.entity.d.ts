import { Policy } from '../policies/policy.entity';
import { User } from '../users/user.entity';
export declare class Claim {
    claimId: number;
    policy: Policy;
    user: User;
    claimAmt: number;
    description: string;
    status: string;
    submittedAt: Date;
}
