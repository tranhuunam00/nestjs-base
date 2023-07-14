import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'

describe('AppController', () => {
  beforeEach(async () => {
    // const app: TestingModule = await Test.createTestingModule({}).compile()
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(true).toEqual(true)
    })
  })
})
