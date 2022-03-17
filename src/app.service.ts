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

  async seed() {
    // information about the CEO
    const ceo = this.employeeRepository.create({ name: ' Mr CEO' });
    await this.employeeRepository.save(ceo);
    const ceoContactInfo = this.contactInfoRepository.create({
      email: 'ceo@gmail.com',
    });
    ceoContactInfo.employee = ceo;
    await this.contactInfoRepository.save(ceoContactInfo);
    // information about the manager
    const manager = this.employeeRepository.create({ name: 'Gins' });
    manager.manager = ceo;
    await this.employeeRepository.save(manager);

    const managerContact = this.contactInfoRepository.create({
      email: 'gins@gmail.com',
    });
    managerContact.employee = manager;
    await this.contactInfoRepository.save(managerContact);

    // Task1 for the manager
    const task1 = await this.tasksRepository.create({
      name: 'meeting with ceo',
    });
    task1.employee = manager;
    await this.tasksRepository.save(task1);

    // task2 for manager
    const task2 = await this.tasksRepository.create({
      name: 'presentation to the board',
    });
    task2.employee = manager;
    await this.tasksRepository.save(task2);

    // meeting 1 includes ceo and manager
    const meeting1 = await this.meetingsRepository.create({
      url: 'zoom url for meeting1',
    });
    meeting1.attendees = [ceo, manager];
    await this.meetingsRepository.save(meeting1);

    // meeting2 includes the ceo and manager

    const meeting2 = await this.meetingsRepository.create({
      url: 'teams meeting url for meeting2 ',
    });
    meeting2.attendees = [ceo, manager];
    await this.meetingsRepository.save(meeting2);

    return 'seeding complete';
  }

  async getEmployeeDataById(id: number) {
    /* 
    return this.employeeRepository.findOneOrFail(id, {
      relations: [
        'manager',
        'directReports',
        'contactInfo',
        'task',
        'meetings',
      ],
    }); */

    //using build query

    return this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.directReports', 'directReports')
      .leftJoinAndSelect('employee.task', 'task')
      .leftJoinAndSelect('employee.manager', 'manager')
      .leftJoinAndSelect('employee.meetings', 'meetings')
      .where('employee.id = :employeeId', { employeeId: id })
      .getOne();
  }

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
