import { TagRepository } from '../repositories/tag-repository.js';

type TagType = Awaited<
  ReturnType<typeof TagRepository.getAllowedTagTypes>
>[number];

export class TagService {
  static async getTags(type?: string) {
    if (type) {
      const allowedTagTypes = await TagRepository.getAllowedTagTypes();
      const formattedType = type.toUpperCase();

      if (!allowedTagTypes.includes(formattedType as TagType)) {
        throw new Error(`Invalid tag type: ${type}`);
      }

      return TagRepository.findByType(formattedType as TagType);
    }

    return TagRepository.findAll();
  }
}
