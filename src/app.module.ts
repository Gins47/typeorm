import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { User } from './user.entity';
import { Task } from './tasks.entity';
import { Meetings } from './meetings.entity';
import { ContactInfo } from './contact-info.entity';
import Employee from './employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User, Task, Meetings, ContactInfo, Employee]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
