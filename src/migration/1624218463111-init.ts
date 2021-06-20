/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable class-methods-use-this */
import {MigrationInterface, QueryRunner} from "typeorm";

export class init1624218463111 implements MigrationInterface {
    name = 'init1624218463111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board_column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "order" smallint NOT NULL, CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "order" smallint NOT NULL, "description" character varying(255) NOT NULL, "userId" character varying(36), "boardId" character varying(36) NOT NULL, "columnId" character varying(36), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "login" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "board_column"`);
        await queryRunner.query(`DROP TABLE "board"`);
    }

}
