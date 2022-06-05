import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async update(user: any, dto: UpdateUserDto) {
    return await this.dbService.user.update({
      where: { id: user.id },
      data: {
        ...dto,
      },
    });
  }
}
