import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  emailAddress: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  role: string;

  @Column({ nullable: true, type: 'varchar' }) // Explicitly allowing NULL
  location: string | null;

  @Column({ nullable: true, type: 'varchar' }) // Explicitly allowing NULL
  profilePicture: string | null;

  @Column({ default: true })
  status: boolean;
}
