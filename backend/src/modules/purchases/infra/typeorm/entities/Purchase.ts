import Product from '@modules/products/infra/typeorm/entities/Product';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('purchases')
class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double')
  total: number;

  @Column('varchar')
  pay_type: string;

  @Column('varchar')
  status: string;

  @ManyToMany(() => Product, { onDelete: 'CASCADE' })
  @JoinTable()
  products: Product[];

  @CreateDateColumn()
  created_at: Date;
}

export default Purchase;
