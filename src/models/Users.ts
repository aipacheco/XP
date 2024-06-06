import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Roles } from "./Roles"

@Entity("users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "first_name" })
  first_name!: string

  @Column({ name: "last_name" })
  last_name!: string

  @Column({ name: "password", select: false })
  password!: string

  @Column({ name: "email" })
  email!: string

  @Column({ name: "avatar" })
  avatar!: string

  @Column({ name: "isActive" })
  isActive!: boolean

  @Column({ name: "role_id" })
  roleId!: number

  @ManyToOne(() => Roles, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role_id!: Roles
}
