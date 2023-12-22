import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Reports {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  price: number;
}
