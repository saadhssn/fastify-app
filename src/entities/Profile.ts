// Profile entity model for representing user profiles in the database, including fields like username, email, role, location, and status.

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number; // Primary key for the profile, auto-generated

  @Column({ unique: true })
  username: string; // Unique username for the profile

  @Column()
  name: string; // Name of the profile holder

  @Column()
  firstName: string; // First name of the profile holder

  @Column()
  lastName: string; // Last name of the profile holder

  @Column({ unique: true })
  emailAddress: string; // Unique email address for the profile

  @Column({ unique: true })
  phoneNumber: string; // Unique phone number for the profile

  @Column()
  role: string; // Role of the profile (e.g., admin, user, etc.)

  @Column({ nullable: true, type: 'varchar' }) // Explicitly allowing NULL for location
  location: string | null; // Optional location of the profile holder

  @Column({ nullable: true, type: 'varchar' }) // Explicitly allowing NULL for profile picture
  profilePicture: string | null; // Optional profile picture URL

  @Column({ default: true })
  status: boolean; // Status of the profile (active/inactive), defaults to true (active)
}
