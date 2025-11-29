import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
export declare class PoliciesController {
    private service;
    constructor(service: PoliciesService);
    findAll(req: any): Promise<import("./policy.entity").Policy[]>;
    findOne(req: any, id: number): Promise<import("./policy.entity").Policy>;
    create(req: any, dto: CreatePolicyDto): Promise<import("./policy.entity").Policy>;
    update(req: any, id: number, dto: UpdatePolicyDto): Promise<import("./policy.entity").Policy>;
}
