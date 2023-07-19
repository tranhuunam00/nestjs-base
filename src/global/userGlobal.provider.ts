import { Global, Injectable, Scope } from '@nestjs/common'
import { User } from 'src/models/user.model'

@Global()
@Injectable()
export class UserRequestProvider {
  public userRequest: User
}
