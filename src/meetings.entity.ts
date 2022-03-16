import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Employee from './employee.entity';
@Entity()
export class Meetings {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @ManyToMany(() => Employee, (employee) => employee.meetings)
  attendees: Employee[];
}
