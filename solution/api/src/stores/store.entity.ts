import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum Status {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED'
}

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  status: Status

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date



}
