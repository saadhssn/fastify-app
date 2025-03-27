import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'sneakers' })
export class Sneakers {
  @PrimaryGeneratedColumn()
  id: number; // Primary key for the sneaker, auto-generated

  @Column({ nullable: true })
  sneaker: string; // Sneaker name

  @Column({ nullable: true })
  imageThumbnail: string; // Image thumbnail URL

  @Column({ nullable: true })
  status: string; // Status of the sneaker

  @Column({ nullable: true })
  publishStatus: string; // Publish status of the sneaker

  @Column({ nullable: true })
  mkPublishStatus: string; // MK Publish status

  @Column({ nullable: true })
  brand: string; // Brand of the sneaker

  @Column({ nullable: true })
  name: string; // Name of the sneaker

  @Column({ nullable: true })
  colorway: string; // Colorway of the sneaker

  @Column({ nullable: true })
  shopifyLiveLink: string; // Shopify live link

  @Column({ nullable: true })
  shopifyLiveLinkMatchKicks: string; // Shopify live link for Match Kicks

  @Column({ nullable: true })
  baseProductSetNew: string; // Base Product Set New

  @Column({ nullable: true })
  baseProductSetNewName: string; // Base Product Set New Name

  @Column({ nullable: true })
  baseProductSet: string; // Base Product Set

  @Column('text', { array: true, nullable: true })
  colors: string[]; // Array of color variations

  @Column({ nullable: true })
  mkShopifyHandle: string; // MK Shopify Handle

  @Column({ nullable: true })
  airTableId: string; // Airtable ID reference

  @Column({ nullable: true })
  isForTestStore: string; // Indicates if it's for test store

  @Column({ nullable: true })
  allowedShirtColorsOld06112024: string; // Allowed shirt colors (old version)

  @Column({ nullable: true })
  nameFromBaseProductSet: string; // Name from Base Product Set

  @Column({ nullable: true })
  serialNumber: string; // Serial number of the sneaker

  @Column({ nullable: true })
  generateNumber: string; // Generated number

  @Column({ nullable: true })
  allowedShirtColorsOld13112024: string; // Allowed shirt colors (newer version)
}
