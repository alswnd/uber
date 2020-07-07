import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { rideStatus } from "src/types/types";
import User from "./User";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
    default: "REQUESTING",
  })
  status: rideStatus;

  @Column({ type: "text" })
  pickUpAddress: string;

  @Column({ type: "double precision", default: 0 })
  pickUpLat: number;

  @Column({ type: "double precision", default: 0 })
  pickUpLng: number;

  @Column({ type: "text" })
  dropOffAddress: string;

  @Column({ type: "double precision", default: 0 })
  dropOffLat: number;

  @Column({ type: "double precision", default: 0 })
  dropOffLng: number;

  @Column({ type: "double precision", default: 0 })
  price: number;

  @Column({ type: "text" })
  distance: string;

  @Column({ type: "text" })
  duration: string;

  /**
   * this let typeorm automatically attach id without seeing database
   * @how typeorm see passenger's foriegn key and show it to us.
   * with this can avoid finding all object at first
   */
  @Column({ nullable: true })
  passengerId: number;

  @ManyToOne((type) => User, (user) => user.ridesAsPassenger)
  passenger: User;

  // nullable : true => when requesting a ride, driver not assigned yet.
  @ManyToOne((type) => User, (user) => user.ridesAsDriver, { nullable: true })
  driver: User;

  @Column({ nullable: true })
  driverId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Ride;
