import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from "typeorm";
import { VerificationTarget } from "src/types/types";
import User from "./User";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @name target
   * @description this can be a phone or email. so using ts file to verify type.
   */
  @Column({ type: "text", enum: [PHONE, EMAIL] })
  target: VerificationTarget;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  used: boolean;

  // @ManyToOne((type) => User, (user) => user.verifications, { nullable: true }) // you can create user without verification before start phonenumber.
  // user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: String;

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      // short key
      this.key = Math.floor(Math.random() * 100000).toString();
    } else if (this.target === EMAIL) {
      // long key
      this.key = Math.random().toString(36).substr(2);
    }
  }
}

export default Verification;
