import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    //  return this.appService.createUser({ name: 'John', password: '1234' });
    await this.appService.seed();
    return this.appService.getEmployeeDataById(2);
  }
}
