import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";
import Chat from "./Chat";
import User from "./User";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  /**
   * relationshop with Chat
   */
  @ManyToOne((type) => Chat, (chat) => chat.messages)
  chat: Chat;

  @ManyToOne((type) => User, (user) => user.messages)
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: String;
}

export default Message;
