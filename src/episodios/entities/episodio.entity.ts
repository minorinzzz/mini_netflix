import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Serie } from '../../series/entities/serie.entity';

@Entity('episodios')
export class Episodio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  duracion: number;

  @Column()
  numeroCapitulo: number;

  @ManyToOne(() => Serie, (serie) => serie.episodios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'serieId' })
  serie: Serie;

  @Column()
  serieId: number;
}
