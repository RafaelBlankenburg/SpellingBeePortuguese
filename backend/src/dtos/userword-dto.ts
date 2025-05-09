import { Prisma, UserWord} from '@prisma/client';

export interface CreateUserWordDto {
  word: string;
  foundAt: Date;
  user_id: string;
  challenge_id: string;
}

export class UserWordOutputDto {
  word: string;

  constructor(data: UserWordOutputDto) {
    this.word = data.word;
  }

  static fromEntity(
    entity: UserWord): UserWordOutputDto {
    return new UserWordOutputDto({
      word: entity.word,
    });
  }

  static fromEntities(entities: UserWord[]): UserWordOutputDto[] {
    return entities.map(UserWordOutputDto.fromEntity);
  }
}
