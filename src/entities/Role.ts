// Role entity model for representing user roles in the database, including fields like name, based role, and status.

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number; // Primary key for the role, auto-generated

  @Column({ unique: true })
  name: string; // Unique name for the role (e.g., admin, user)

  @Column()
  basedRole: string; // The base role that this role is derived from (e.g., "user" -> "admin")

  @Column({ default: true })
  status: boolean; // Status of the role (active/inactive), defaults to true (active)
}
