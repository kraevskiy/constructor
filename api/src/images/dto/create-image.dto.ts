
import { IsString } from 'class-validator';
export class CreateImageDto{
  @IsString()
  type: string;

  @IsString()
  url: string;
}