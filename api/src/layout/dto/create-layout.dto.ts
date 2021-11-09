import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLayoutDto {
  @IsOptional()
  @IsString()
  user?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slash?: string;

  @IsString()
  config: string;

  @IsArray()
  files: string[];

  @IsString()
  instance: string;

  @IsString()
  preview?: string;

  @IsOptional()
  @IsBoolean()
  onOrder: boolean;

  @IsString()
  type: string;

  @IsOptional()
  @IsBoolean()
  public: boolean;
}

export class EditLayoutDto {
  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slash?: string;

  @IsOptional()
  @IsString()
  config?: string;

  @IsOptional()
  @IsArray()
  files?: string[];

  @IsOptional()
  @IsString()
  instance?: string;

  @IsOptional()
  @IsString()
  preview?: string;

  @IsOptional()
  @IsBoolean()
  onOrder?: boolean;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsBoolean()
  public: boolean;
}
