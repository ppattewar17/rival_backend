import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean = false;
}

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  content?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export class BlogQueryDto {
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
