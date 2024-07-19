import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Scooter } from '@modules/scooters/entities/scooter.entity';
import { User } from '@modules/users/entities/user.entity';

@Entity('rent_records', { schema: 'public' })
@Unique(['user', 'scooter', 'endTime'])
export class RentRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'scooter_id' })
    scooterId: number;

    @ManyToOne(() => User, user => user.rentRecords)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Scooter, scooter => scooter.rentRecords)
    @JoinColumn({ name: 'scooter_id' })
    scooter: Scooter;

    @Column({ name: 'start_time', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    startTime: Date;

    @Column({ name: 'end_time', type: 'timestamp with time zone', nullable: true })
    endTime: Date;

    @Column({ name: 'start_latitude', type: 'decimal', precision: 10, scale: 8, nullable: true })
    startLatitude: number;

    @Column({ name: 'start_longitude', type: 'decimal', precision: 11, scale: 8, nullable: true })
    startLongitude: number;

    @Column({ name: 'end_latitude', type: 'decimal', precision: 10, scale: 8, nullable: true })
    endLatitude: number;

    @Column({ name: 'end_longitude', type: 'decimal', precision: 11, scale: 8, nullable: true })
    endLongitude: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}