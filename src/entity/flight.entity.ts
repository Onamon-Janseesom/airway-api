import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'flight'})
export class FlightEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: "available"
    })
    status: string;

    @Column({
        nullable: false,
        default: "THAI AIRWAYS"
    })
    company: string;
    
    @Column({
        nullable: false
    })
    flightNumber: string;

    @Column({
        nullable: false
    })
    seat: string;

    @Column({
        type: 'date'
    })
    time: Date;
    
    @Column({
        nullable: false
    })
    from: string;

    @Column({
        nullable: false
    })
    to: string;

    @Column({
        nullable: true
    })
    price: number;

    @Column({
        nullable: true
    })
    bookedDate: Date;

    @Column({
        nullable: true
    })
    bookingUser: string;
}
