import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'designs' })
export class Designs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) 
  svg: string;
  
  @Column({ nullable: true }) 
  preview: string;
  
  @Column({ nullable: true }) 
  svgHats: string;
  
  @Column({ nullable: true }) 
  previewHats: string;
  
  @Column({ nullable: true }) 
  svgJoggers: string;
  
  @Column({ nullable: true }) 
  previewJoggers: string;
  
  @Column({ nullable: true }) 
  brands: string;
  
  @Column({ nullable: true }) 
  designer: string;
  
  @Column({ nullable: true }) 
  logoFullFromBrands: string;
  
  @Column({ nullable: true }) 
  licenses: string;
  
  @Column({ nullable: true }) 
  editLink: string;
  
  @Column({ nullable: true }) 
  designStatus: string;
  
  @Column({ nullable: true }) 
  publishStatus: string;
  
  @Column({ nullable: true }) 
  tags: string;
  
  @Column({ nullable: true }) 
  googleMcc: string;
  
  @Column({ nullable: true }) 
  source: string;
  
  @Column({ nullable: true }) 
  nameFromDesigner: string;
  
  @Column({ nullable: true }) 
  layeredBy: string;
  
  @Column({ nullable: true }) 
  nameFromLayeredBy: string;
  
  @Column({ nullable: true }) 
  dateCreated: string;

  // Storing arrays instead of separate columns
  @Column("simple-array", { nullable: true }) layerIdHats: string[];
  @Column("simple-array", { nullable: true }) layerDisplayHats: string[];

  @Column("simple-array", { nullable: true }) layerIdJoggers: string[];
  @Column("simple-array", { nullable: true }) layerDisplayJoggers: string[];

  @Column("simple-array", { nullable: true }) layerId: string[];
  @Column("simple-array", { nullable: true }) layerDisplay: string[];

  @Column({ nullable: true }) feedback: string;
  @Column({ nullable: true }) shopifyId: string;
  @Column({ nullable: true }) shopifyHandle: string;
  @Column({ nullable: true }) errorLog: string;
  @Column({ nullable: true }) designDescription: string;
  @Column({ nullable: true }) seoTitle: string;
  @Column({ nullable: true }) dateModified: string;
  @Column({ nullable: true }) svgFillType: string;
  @Column({ nullable: true }) s3Id: string;
  @Column({ nullable: true }) s3Url: string;
  @Column({ nullable: true }) airTableId: string;
  @Column({ nullable: true }) popularity: string;
  @Column({ nullable: true }) sortOrder: string;
  @Column({ nullable: true }) mkShopifyId: string;
  @Column({ nullable: true }) mkShopifyHandle: string;
  @Column({ nullable: true }) nameFromBrands: string;
  @Column({ nullable: true }) age: string;
  @Column({ nullable: true }) siteUrl: string;
  @Column({ nullable: true }) liveLink: string;
  @Column({ nullable: true }) gender: string;
  @Column({ nullable: true }) auditDone: string;
  @Column({ nullable: true }) shopifyEditLink: string;
  @Column({ nullable: true }) quickArchive: string;
  @Column({ nullable: true }) recId: string;
  @Column({ nullable: true }) status: string;
  @Column({ nullable: true }) link: string;
  @Column({ nullable: true }) tagInShopify: string;
  @Column({ nullable: true }) mostPopularDesign: string;
}