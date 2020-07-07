import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
import Message from "../../../entities/Message";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: privateResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req }
      ): Promise<SendChatMessageResponse> => {
        const user: User = req.user;

        try {
          const chat = await Chat.findOne({ id: args.chatId });
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              const message = await Message.create({
                text: args.text,
                chat,
                user,
              }).save();

              return { ok: true, error: null, message };
            } else {
              return {
                ok: false,
                error: "You are not authorized to this chat",
                message: null,
              };
            }
          } else {
            return { ok: false, error: "Chat not found", message: null };
          }
        } catch (e) {
          return { ok: false, error: e.message, message: null };
        }
      }
    ),
  },
};

export default resolvers;
