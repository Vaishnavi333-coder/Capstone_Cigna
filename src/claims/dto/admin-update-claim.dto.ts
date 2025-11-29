import { IsIn } from 'class-validator';

export class AdminUpdateClaimDto {
  @IsIn(['Under Review', 'Approved', 'Rejected'])
  status: string;
}

