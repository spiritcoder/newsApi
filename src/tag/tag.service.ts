import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.save(createTagDto);
  }

  async findAll() {
    return await this.tagRepository.find({});
  }

  async findOne(id: number) {
    return await this.tagRepository.find({
      where: [{ id }],
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.tagRepository.save(updateTagDto);
  }

  async remove(id: number) {
    const news = await this.findOne(id);
    return this.tagRepository.remove(news);
  }
}
