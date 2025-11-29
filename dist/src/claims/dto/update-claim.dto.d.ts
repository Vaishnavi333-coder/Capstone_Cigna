import { CreateClaimDto } from './create-claim.dto';
declare const UpdateClaimDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateClaimDto>>;
export declare class UpdateClaimDto extends UpdateClaimDto_base {
    status?: string;
}
export {};
