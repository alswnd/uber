/**
 * @name class-validator
 * @description it helps to validate a class.
 */
import { IsEmail } from "class-validator";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
} from "typeorm";
import bcrypt from "bcrypt";
import Chat from "./Chat";
import Message from "./Message";
import Ride from "./Ride";
import Place from "./Place";

/**
 * @BRYCPT_ROUNDS : how many times will rounds.
 */
const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "boolean", default: false })
  isDriving: boolean;

  @Column({ type: "boolean", default: false })
  isRiding: boolean;

  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  /**
   * @description we use double precision as float in graphQL.
   */
  @Column({ type: "double precision", default: 0 })
  lastLng: number;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  @Column({ type: "text", nullable: true })
  fbId: string; // facebook id

  @OneToMany((type) => Chat, (chat) => chat.passenger)
  chatAsPassenger: Chat[];

  @OneToMany((type) => Chat, (chat) => chat.driver)
  chatAsDriver: Chat[];

  @OneToMany((type) => Message, (messages) => messages.user)
  messages: Message[];

  @OneToMany((type) => Ride, (ride) => ride.passenger)
  ridesAsPassenger: Ride[];

  @OneToMany((type) => Ride, (ride) => ride.driver)
  ridesAsDriver: Ride[];

  @OneToMany((type) => Place, (place) => place.user)
  places: Place[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  /**
   * @method fullName()
   * @return_type string
   */
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  /**
   * @async returns Promise, and Promise returns void.
   */
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  /**
   * @function comparePassword : verify if it is valid password
   * @param password password user input
   */
  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  /**
   * it takes some time, so we need to return @Promise
   * @param password
   */
  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
