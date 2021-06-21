/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable class-methods-use-this */
import {MigrationInterface, QueryRunner} from "typeorm";

export class init1624221991596 implements MigrationInterface {
    name = 'init1624221991596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ADD "columns" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "columns"`);
    }

}
