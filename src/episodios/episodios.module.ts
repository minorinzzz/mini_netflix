import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodiosService } from './episodios.service';
import { EpisodiosController } from './episodios.controller';
import { Episodio } from './entities/episodio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episodio])],
  controllers: [EpisodiosController],
  providers: [EpisodiosService],
  exports: [EpisodiosService],
})
export class EpisodiosModule {}
