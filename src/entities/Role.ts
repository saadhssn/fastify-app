import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  basedRole: string;

  @Column({ default: true })
  status: boolean;
}