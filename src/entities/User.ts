// User entity model for representing users in the database, including fields like username, email, password, role, and status.

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Primary key for the user, auto-generated

  @Column({ unique: true })
  username: string; // Unique username for the user

  @Column()
  name: string; // Full name of the user

  @Column()
  firstName: string; // First name of the user

  @Column()
  lastName: string; // Last name of the user

  @Column({ unique: true })
  emailAddress: string; // Unique email address for the user

  @Column({ unique: true })
  phoneNumber: string; // Unique phone number for the user

  @Column()
  password: string; // Password for the user, should be securely hashed

  @Column()
  role: string; // Role of the user (e.g., admin, user)

  @Column({ nullable: true, type: 'varchar' }) // Explicitly allowing NULL for location
  location: string | null; // Optional location of the user

  @Column({ nullable: true, type: 'varchar' }) // Explicitly allowing NULL for profile picture
  profilePicture: string | null; // Optional URL for the user's profile picture

  @Column({ default: true })
  status: boolean; // Status of the user (active/inactive), defaults to true (active)
}
