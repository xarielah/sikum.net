import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PostDto {
  @IsString()
  @MaxLength(256)
  @MinLength(3)
  title: string;

  @IsString()
  @MaxLength(1024)
  description: string;

  @IsString()
  @IsOptional()
  fileUrl: string;

  @IsOptional()
  tags: string[];

  file: any;

  @IsString()
  topicId: string;
}
