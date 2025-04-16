import { PrismaClient, TagType } from '@prisma/client';

const prisma = new PrismaClient();

export class TagRepository {
  static async findAll(type?: string) {
    return prisma.tag.findMany({
      where: type ? { type: type as TagType } : undefined,
    });
  }
  static async findByType(type: TagType) {
    return prisma.tag.findMany({
      where: {
        type: type,
      },
    });
  }

  static async findById(id: string) {
    return prisma.tag.findUnique({
      where: { id },
    });
  }

  static async getAllowedTagTypes() {
    return Object.values(TagType);
  }
}
