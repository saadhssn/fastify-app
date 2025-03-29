"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1743111521876 = void 0;
class InitialMigration1743111521876 {
    constructor() {
        this.name = 'InitialMigration1743111521876';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "sneakers" ("id" SERIAL NOT NULL, "sneaker" character varying, "imageThumbnail" character varying, "status" character varying, "publishStatus" character varying, "mkPublishStatus" character varying, "brand" character varying, "name" character varying, "colorway" character varying, "shopifyLiveLink" character varying, "shopifyLiveLinkMatchKicks" character varying, "baseProductSetNew" character varying, "baseProductSetNewName" character varying, "baseProductSet" character varying, "colors" text array, "mkShopifyHandle" character varying, "airTableId" character varying, "isForTestStore" character varying, "allowedShirtColorsOld06112024" character varying, "nameFromBaseProductSet" character varying, "serialNumber" character varying, "generateNumber" character varying, "allowedShirtColorsOld13112024" character varying, CONSTRAINT "PK_94f3924b45d752e8a761ca3705e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "name" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "emailAddress" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "location" character varying, "profilePicture" character varying, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_0a15e52405edda3ea73124ab407" UNIQUE ("emailAddress"), CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "basedRole" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "name" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "emailAddress" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "role" character varying NOT NULL, "location" character varying, "profilePicture" character varying, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_d1ea35db5be7c08520d70dc03f8" UNIQUE ("username"), CONSTRAINT "UQ_8a93604883de7d4eafd4a64f7bf" UNIQUE ("emailAddress"), CONSTRAINT "UQ_8197446e07563b8f4c34f69881f" UNIQUE ("phoneNumber"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "imageFile" character varying, "firstMock" character varying, "usSizesInStock" character varying, "activeMockups" character varying, "firstMockAirTableId" character varying, "airTableRecordId" character varying, "swatchColor" character varying, "parentProduct" character varying, "printType" character varying, "combinedSizeInfo" character varying, "productDetails" character varying, "sizeAndProductInformation" character varying, "statusFromParentProduct" character varying, "dataStoreKey" character varying, "brand" character varying, "model" character varying, "productColor" character varying, "printFulProductColor" character varying, "productType" character varying, "status" character varying, "availableOn" character varying, "description" character varying, "dateCreated" character varying, "originalAllImages" character varying, "productSets" character varying, "shopifyHandleFromProductSets" character varying, "colorTypeFromProductSets" character varying, "topLeftXCoordinate" character varying, "topLeftYCoordinate" character varying, "designWidth" character varying, "regularPrice" character varying, "salePrice" character varying, "pricingOkay" character varying, "printfulProductId" character varying, "productAudit" character varying, "auditFixed" character varying, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "designs" ("id" SERIAL NOT NULL, "svg" character varying, "preview" character varying, "svgHats" character varying, "previewHats" character varying, "svgJoggers" character varying, "previewJoggers" character varying, "brands" character varying, "designer" character varying, "logoFullFromBrands" character varying, "licenses" character varying, "editLink" character varying, "designStatus" character varying, "publishStatus" character varying, "tags" character varying, "googleMcc" character varying, "source" character varying, "nameFromDesigner" character varying, "layeredBy" character varying, "nameFromLayeredBy" character varying, "dateCreated" character varying, "layerIdHats" text, "layerDisplayHats" text, "layerIdJoggers" text, "layerDisplayJoggers" text, "layerId" text, "layerDisplay" text, "feedback" character varying, "shopifyId" character varying, "shopifyHandle" character varying, "errorLog" character varying, "designDescription" character varying, "seoTitle" character varying, "dateModified" character varying, "svgFillType" character varying, "s3Id" character varying, "s3Url" character varying, "airTableId" character varying, "popularity" character varying, "sortOrder" character varying, "mkShopifyId" character varying, "mkShopifyHandle" character varying, "nameFromBrands" character varying, "age" character varying, "siteUrl" character varying, "liveLink" character varying, "gender" character varying, "auditDone" character varying, "shopifyEditLink" character varying, "quickArchive" character varying, "recId" character varying, "status" character varying, "link" character varying, "tagInShopify" character varying, "mostPopularDesign" character varying, CONSTRAINT "PK_3679aaa73bc37ec35a24a3cfde8" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "designs"`);
            yield queryRunner.query(`DROP TABLE "products"`);
            yield queryRunner.query(`DROP TABLE "profiles"`);
            yield queryRunner.query(`DROP TABLE "roles"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "sneakers"`);
        });
    }
}
exports.InitialMigration1743111521876 = InitialMigration1743111521876;
