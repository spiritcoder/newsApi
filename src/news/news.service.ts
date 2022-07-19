import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
    private readonly httpService: HttpService,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const news = new News();
    news.author = createNewsDto.author;
    news.name = createNewsDto.name;
    news.tag = createNewsDto.tags.toString();
    news.publicationDate = createNewsDto.publicationDate;
    news.text = createNewsDto.text;

    //do a call to find its sentiments
    news.sentiment = await this.getSentiment(createNewsDto.text);

    const date = new Date(); // Now
    date.setDate(date.getDate() + 30);

    news.expiryDate = new Date(date);
    news.creationDate = new Date();
    return await this.newsRepository.save(news);
  }

  async findAll(): Promise<News[]> {
    return await this.newsRepository.find({
      select: [
        'author',
        'creationDate',
        'id',
        'name',
        'sentiment',
        'tag',
        'publicationDate',
      ],
      where: { expiryDate: MoreThan(new Date()) },
    });
  }

  async findOne(id: number) {
    return await this.newsRepository.find({
      where: [{ id }],
    });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    return await this.newsRepository.save(updateNewsDto);
  }

  async remove(id: number) {
    const news = await this.findOne(id);
    await this.newsRepository.remove(news);
    return 'Article Deleted';
  }

  async getSentiment(text: string): Promise<string> {
    const data = JSON.stringify({ text: text });
    const response = await this.httpService
      .post('https://sentim-api.herokuapp.com/api/v1/', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .toPromise();
    return response.data.result.type;
  }
}
