import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EpisodiosService } from './episodios.service';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('episodios')
export class EpisodiosController {
  constructor(private readonly episodiosService: EpisodiosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEpisodioDto: CreateEpisodioDto) {
    return this.episodiosService.create(createEpisodioDto);
  }

  @Get()
  findAll() {
    return this.episodiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodiosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateEpisodioDto: UpdateEpisodioDto,
  ) {
    return this.episodiosService.update(+id, updateEpisodioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.episodiosService.remove(+id);
  }
}
