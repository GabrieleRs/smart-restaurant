import { IsOptional } from 'class-validator';
export class CreateLiveOrderDTO {
  meals: string[];

  @IsOptional()
  notes?: string;
}
