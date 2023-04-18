import { Global, Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { GmailProcessor } from './email.queue.processor'
import { QUEUE_NAME } from 'src/core/constants'

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAME.GMAIL,
    }),
  ],
  providers: [GmailProcessor],
  exports: [GmailProcessor],
})
export class QueueModule {}
