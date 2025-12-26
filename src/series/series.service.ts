import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from './entities/serie.entity';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Serie)
    private seriesRepository: Repository<Serie>,
  ) {}

  create(createSerieDto: CreateSerieDto) {
    const serie = this.seriesRepository.create(createSerieDto);
    return this.seriesRepository.save(serie);
  }

  findAll() {
    return this.seriesRepository.find({
      relations: ['episodios'],
    });
  }

  async findOne(id: number) {
    const serie = await this.seriesRepository.findOne({
      where: { id },
      relations: ['episodios'],
    });

    if (!serie) {
      throw new NotFoundException(`Serie with ID ${id} not found`);
    }

    return serie;
  }

  async update(id: number, updateSerieDto: UpdateSerieDto) {
    const serie = await this.findOne(id);
    Object.assign(serie, updateSerieDto);
    return this.seriesRepository.save(serie);
  }

  async remove(id: number) {
    const serie = await this.findOne(id);
    await this.seriesRepository.remove(serie);
    return { message: 'Serie deleted successfully' };
  }
}
