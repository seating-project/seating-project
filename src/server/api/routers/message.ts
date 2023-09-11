import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "@/server/api/trpc";
import twilio from "twilio";

export const messageRouter = createTRPCRouter({
  sendWhatsappMessage: publicProcedure
    .input(
      z.object({
        to: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken)

        const message = await client.messages.create({
          body: input.message,
          to: `whatsapp:${input.to}`,
          from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        });

        return { message: "Message sent", messageId: message.sid };
      } catch (error) {
        return { error: "Failed to send message", details: error };
      }
    }),
});
