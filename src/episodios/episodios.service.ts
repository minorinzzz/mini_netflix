import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodio } from './entities/episodio.entity';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';

@Injectable()
export class EpisodiosService {
  constructor(
    @InjectRepository(Episodio)
    private episodiosRepository: Repository<Episodio>,
  ) {}

  create(createEpisodioDto: CreateEpisodioDto) {
    const episodio = this.episodiosRepository.create(createEpisodioDto);
    return this.episodiosRepository.save(episodio);
  }

  findAll() {
    return this.episodiosRepository.find({
      relations: ['serie'],
    });
  }

  async findOne(id: number) {
    const episodio = await this.episodiosRepository.findOne({
      where: { id },
      relations: ['serie'],
    });

    if (!episodio) {
      throw new NotFoundException(`Episodio with ID ${id} not found`);
    }

    return episodio;
  }

  async update(id: number, updateEpisodioDto: UpdateEpisodioDto) {
    const episodio = await this.findOne(id);
    Object.assign(episodio, updateEpisodioDto);
    return this.episodiosRepository.save(episodio);
  }

  async remove(id: number) {
    const episodio = await this.findOne(id);
    await this.episodiosRepository.remove(episodio);
    return { message: 'Episodio deleted successfully' };
  }
}
