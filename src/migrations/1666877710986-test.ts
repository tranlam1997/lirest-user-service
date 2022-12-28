import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1666877710986 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user ADD COLUMN IF NOT EXISTS email_verified BOOLEAN  NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE user DROP COLUMN email_verified`);
  }
}
