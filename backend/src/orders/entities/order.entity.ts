import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { OrderStatus } from '../enum/order-status.enum';
import { UserEntity } from 'src/users/entities/user.entity';
import { ShippingEntity } from './shipping.entity';
import { OrdersProductsEntity } from './orders-products.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderAt: Timestamp;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PROCESSING,
    enumName: 'order_status_enum',
  })
  status: string;

  @Column({ nullable: true })
  shippedAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  @ManyToOne(
    () => UserEntity,
    (user) => user.ordersUpdateBy,
    { onDelete: 'SET NULL' },
  )
  updatedBy: UserEntity;

  @OneToOne(
    () => ShippingEntity,
    (ship) => ship.order,
    { nullable: true, cascade: true },
  )
  @JoinColumn()
  shippingAddress?: ShippingEntity;

  @OneToMany(
    () => OrdersProductsEntity,
    (op) => op.order,
    { cascade: true },
  )
  products: OrdersProductsEntity[];

  @ManyToOne(
    () => UserEntity,
    (user) => user.orders,
  )
  user: UserEntity;
}
