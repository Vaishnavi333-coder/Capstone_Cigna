import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AdminCreatePolicyDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsNotEmpty()
  insurer: string;

  @IsString()
  @IsNotEmpty()
  policyType: string;

  @IsNumber()
  premiumAmt: number;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsOptional()
  @IsString()
  status?: string;
}
