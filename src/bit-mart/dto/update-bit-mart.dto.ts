import { PartialType } from '@nestjs/mapped-types';
import { CreateBitMartDto } from './create-bit-mart.dto';

export class UpdateBitMartDto extends PartialType(CreateBitMartDto) {}
