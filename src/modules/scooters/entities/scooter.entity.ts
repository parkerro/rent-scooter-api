import { RentRecord } from 'src/modules/rentRecords/entities/rentRecord.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Check } from 'typeorm';
import { ScooterStatus } from '../types/scooter.enum';

@Entity('scooters', { schema: 'public' })
@Check(`status IN ('available', 'in_use', 'maintenance')`)
@Check(`battery_level BETWEEN 0 AND 100`)
export class Scooter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    model: string;

    @Column({
        type: 'enum',
        enum: ScooterStatus,
        default: ScooterStatus.AVAILABLE
    })
    status: ScooterStatus;

    @Column('decimal', { precision: 10, scale: 8 })
    latitude: number;

    @Column('decimal', { precision: 11, scale: 8 })
    longitude: number;

    @Column({ name: 'battery_level', type: 'int' })
    batteryLevel: number;

    @Column({ name: 'serial_number', length: 50, unique: true })
    serialNumber: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => RentRecord, rentRecord => rentRecord.scooter)
    rentRecords: RentRecord[];
}