import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClaimDto {
  @IsNumber()
  policyId: number;

  @IsNumber()
  claimAmt: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
