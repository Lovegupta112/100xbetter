-- AlterTable
CREATE SEQUENCE user_userid_seq;
ALTER TABLE "User" ALTER COLUMN "userid" SET DEFAULT nextval('user_userid_seq');
ALTER SEQUENCE user_userid_seq OWNED BY "User"."userid";
