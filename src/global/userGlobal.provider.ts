import { Global, Injectable, Scope } from '@nestjs/common'

@Global()
@Injectable()
export class UserRequestProvider {
  public userRequest
}
