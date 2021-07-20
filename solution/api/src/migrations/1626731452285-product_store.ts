import { MigrationInterface, QueryRunner } from 'typeorm';

export class productStore1626731452285 implements MigrationInterface {
  name = 'productStore1626731452285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const key of [...Array(40).keys()].map((i) => i + 1)) {

      await queryRunner.query(
        `INSERT INTO inventory (product_id, store_id, units_in_stock)  VALUES (${key}, ${
          Math.floor(Math.random() * 6) + 1
        }, ${Math.floor(Math.random() * 20) + 1}) `,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
