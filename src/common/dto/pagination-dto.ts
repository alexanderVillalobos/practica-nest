import { IsNumber, Min, Max, IsPositive, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  @IsPositive()
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @IsNumber({}, { message: 'Limit must be a number' })
  @IsPositive()
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  limit?: number = 10;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
