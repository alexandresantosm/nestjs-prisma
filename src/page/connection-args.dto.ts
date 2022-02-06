import { ApiProperty } from '@nestjs/swagger';

export class ConnectionArgsDTO {
  @ApiProperty({ required: false })
  first?: number;

  @ApiProperty({ required: false })
  last?: number;

  @ApiProperty({ required: false })
  after?: string;

  @ApiProperty({ required: false })
  before?: string;
}
