import { Global, Module } from '@nestjs/common'
import { UserRequestProvider } from './userGlobal.provider'

@Global()
@Module({
    providers: [UserRequestProvider],
    exports: [UserRequestProvider],
})
export class GlobalModule {}
