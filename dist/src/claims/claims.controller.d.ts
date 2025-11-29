import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
export declare class ClaimsController {
    private service;
    constructor(service: ClaimsService);
    findAll(req: any): Promise<import("./claim.entity").Claim[]>;
    findOne(req: any, id: number): Promise<import("./claim.entity").Claim>;
    create(req: any, dto: CreateClaimDto): Promise<import("./claim.entity").Claim>;
    update(req: any, id: number, dto: UpdateClaimDto): Promise<import("./claim.entity").Claim>;
    delete(req: any, id: number): Promise<import("./claim.entity").Claim>;
}
