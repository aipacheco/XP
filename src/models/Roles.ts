import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Users } from "../models/Users"
@Entity("roles")
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number
  
  @Column({ name: "name" })
  name!: string

  @OneToMany(() => Users, (user) => user.role_id)
  users!: Users[];
}
