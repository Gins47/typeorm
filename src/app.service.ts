import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import Employee from './employee.entity';
import { Meetings } from './meetings.entity';
import { Task } from './tasks.entity';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Meetings)
    private meetingsRepository: Repository<Meetings>,
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find(); // SELECT * from Users;
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id); // SELECT * from Users where id = id;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: User): Promise<User> {
    const newUser = this.usersRepository.create({ ...user });
    return this.usersRepository.save(newUser); // insert or update
  }

  async updatePassword(id: number, password: string): Promise<User> {
    try {
      const user = await this.getOneById(id);
      user.password = password;
      return this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);
    return this.usersRepository.remove(user);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
