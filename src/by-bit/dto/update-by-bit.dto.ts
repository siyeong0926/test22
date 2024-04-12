import { PartialType } from '@nestjs/mapped-types';
import { CreateByBitDto } from './create-by-bit.dto';

export class UpdateByBitDto extends PartialType(CreateByBitDto) {}
