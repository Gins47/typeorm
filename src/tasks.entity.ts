import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Employee from './employee.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Employee, (employee) => employee.task, {
    onDelete: 'SET NULL',
  })
  employee: Employee;
}
