import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Episodio } from '../../episodios/entities/episodio.entity';

@Entity('series')
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  genero: string;

  @Column('text')
  sinopsis: string;

  @Column()
  urlPortada: string;

  @OneToMany(() => Episodio, (episodio) => episodio.serie, {
    cascade: true,
    eager: true,
  })
  episodios: Episodio[];
}
