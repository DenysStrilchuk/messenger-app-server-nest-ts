import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(
    @Body()
    body: {
      text: string;
      senderId: string;
      receiverId: string;
      fileUrl: string | null;
    },
  ) {
    await this.messagesService.sendMessage(
      body.text,
      body.senderId,
      body.receiverId,
      body.fileUrl,
    );
  }

  @Get()
  async getMessages(
    @Query('senderId') senderId: string,
    @Query('receiverId') receiverId: string,
  ) {
    return this.messagesService.getMessages(senderId, receiverId);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    await this.messagesService.deleteMessage(id);
  }
}
