import { MigrationInterface, QueryRunner } from 'typeorm';

const faker = require('faker');

const STORE_STORES = [
  'ALDO Centre Eaton',
  'ALDO Destiny USA Mall',
  'ALDO Pheasant Lane Mall',
  'ALDO Holyoke Mall',
  'ALDO Maine Mall',
  'ALDO Crossgates Mall',
  'ALDO Burlington Mall',
  'ALDO Solomon Pond Mall',
  'ALDO Auburn Mall',
  'ALDO Waterloo Premium Outlets',
];
const SHOES_MODELS = [
  'ADERI',
  'MIRIRA',
  'CAELAN',
  'BUTAUD',
  'SCHOOLER',
  'SODANO',
  'MCTYRE',
  'CADAUDIA',
  'RASIEN',
  'WUMA',
  'GRELIDIEN',
  'CADEVEN',
  'SEVIDE',
  'ELOILLAN',
  'BEODA',
  'VENDOGNUS',
  'ABOEN',
  'ALALIWEN',
  'GREG',
  'BOZZA',
];

export class products1626723794501 implements MigrationInterface {
  name = 'products1626723794501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const store of STORE_STORES) {
      await queryRunner.query(
        `INSERT INTO store (name,description,status) VALUES ('${store}', 'asd', 'active')`,
      );
    }

    for (const model of SHOES_MODELS) {
      await queryRunner.query(
        `INSERT INTO product (name, unit_price) VALUES ('${model}', ${Math.floor(
          Math.random() * 40,
        )})`,
      );
    }

    for (const model of SHOES_MODELS) {
      await queryRunner.query(
        `INSERT INTO product (name, unit_price) VALUES ('${model}', ${Math.floor(
          Math.random() * 40,
        )})`,
      );
    }

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "product" ADD "unitsInStock" integer NOT NULL`);
  }
}
