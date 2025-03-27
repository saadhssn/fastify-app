import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn()
  id: number; // Primary key for the product, auto-generated

  @Column({ nullable: true })
  imageFile: string;

  @Column({ nullable: true })
  firstMock: string;

  @Column({ nullable: true })
  usSizesInStock: string;

  @Column({ nullable: true })
  activeMockups: string;

  @Column({ nullable: true })
  firstMockAirTableId: string;

  @Column({ nullable: true })
  airTableRecordId: string;

  @Column({ nullable: true })
  swatchColor: string;

  @Column({ nullable: true })
  parentProduct: string;

  @Column({ nullable: true })
  printType: string;

  @Column({ nullable: true })
  combinedSizeInfo: string;

  @Column({ nullable: true })
  productDetails: string;

  @Column({ nullable: true })
  sizeAndProductInformation: string;

  @Column({ nullable: true })
  statusFromParentProduct: string;

  @Column({ nullable: true })
  dataStoreKey: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  productColor: string;

  @Column({ nullable: true })
  printFulProductColor: string;

  @Column({ nullable: true })
  productType: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  availableOn: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  dateCreated: string;

  @Column({ nullable: true })
  originalAllImages: string;

  @Column({ nullable: true })
  productSets: string;

  @Column({ nullable: true })
  shopifyHandleFromProductSets: string;

  @Column({ nullable: true })
  colorTypeFromProductSets: string;

  @Column({ nullable: true })
  topLeftXCoordinate: string;

  @Column({ nullable: true })
  topLeftYCoordinate: string;

  @Column({ nullable: true })
  designWidth: string;

  @Column({ nullable: true })
  regularPrice: string;

  @Column({ nullable: true })
  salePrice: string;

  @Column({ nullable: true })
  pricingOkay: string;

  @Column({ nullable: true })
  printfulProductId: string;

  @Column({ nullable: true })
  productAudit: string;

  @Column({ nullable: true })
  auditFixed: string;
}
