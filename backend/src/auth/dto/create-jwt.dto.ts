import { PickType } from '@nestjs/swagger';
import { UserInfo } from 'src/types/auth.type';

export class CreateJwtDto extends PickType(UserInfo, ['email', 'nickname'] as const) {}
