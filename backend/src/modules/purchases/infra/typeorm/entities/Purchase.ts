import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pruchases')
class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  total: number;

  @Column()
  price: number;

  @Column()
  pay_type: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Purchase;
