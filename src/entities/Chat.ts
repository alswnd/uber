import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Column,
  OneToOne,
} from "typeorm";
import Message from "./Message";
import User from "./User";
import Ride from "./Ride";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  rideId: number;

  @OneToOne((type) => Ride, (ride) => ride.chat)
  ride: Ride;

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[];

  @ManyToOne((type) => User, (user) => user.chatAsPassenger)
  passenger: User;

  @Column({ nullable: true })
  passengerId: number;

  @ManyToOne((type) => User, (user) => user.chatAsDriver)
  driver: User;

  @Column({ nullable: true })
  driverId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Chat;
