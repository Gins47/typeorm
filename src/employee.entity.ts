import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Meetings } from './meetings.entity';
import { Task } from './tasks.entity';
@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Employee, (employee) => employee.directReports, {
    onDelete: 'SET NULL',
  })
  manager: Employee;
  @OneToMany(() => Employee, (employee) => employee.manager)
  directReports: Employee[];
  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  contactInfo: ContactInfo;
  @OneToMany(() => Task, (task) => task.employee)
  task: Task[];
  @ManyToMany(() => Meetings, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: Meetings[];
}

export default Employee;
