ALTER TABLE "users" RENAME COLUMN "mac_address" TO "device_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_mac_address_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_device_id_unique" UNIQUE("device_id");