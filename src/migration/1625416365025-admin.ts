import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class init1625416365025 implements MigrationInterface {
  name = 'init1625416365025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (name, login, password) values('admin', 'admin', '${await bcrypt.hash(
        'admin',
        10,
      )}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE login = 'admin'`);
  }
}
