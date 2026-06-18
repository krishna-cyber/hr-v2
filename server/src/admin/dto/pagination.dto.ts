import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page!: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit!: number;

  @IsOptional()
  @IsString()
  search!: string;
}
