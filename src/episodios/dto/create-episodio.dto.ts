import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateEpisodioDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsNumber()
  @IsPositive()
  duracion: number;

  @IsNumber()
  @IsPositive()
  numeroCapitulo: number;

  @IsNumber()
  @IsPositive()
  serieId: number;
}
