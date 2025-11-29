import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, IsDate, Min } from 'class-validator';

export class CreatePolicyDto {
  @IsNotEmpty()
  @IsString()
  insurer: string;

  @IsNotEmpty()
  @IsString()
  policyType: string;

  @IsNumber()
  premiumAmt: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  status: string;
}
