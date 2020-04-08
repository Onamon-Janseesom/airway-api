import { FlightEntity } from './entity/flight.entity';
import { BookingFlightDto } from './dto/booking-flight.dto';
import { Controller, Get, Body, HttpStatus, Res, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CancelBookingFlightDto } from './dto/cancel-booking.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(FlightEntity)
    private readonly flightRepository: Repository<FlightEntity>
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/all-flights')
  async getAllFlights(@Res() res) {
    let query = await this.flightRepository.find();
    
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: query,
    });
  }

  @Get('/available-flight')
  async flightAvialble(@Query() params, @Res() res){
    // let item, result;
    // item = Math.random() >= 0.35; //true of false
    // if(item){
    //   result = "true";
    // }
    // else{
    //   result = "false";
    // }
    
    let query = await this.flightRepository.find({ status: 'available' });

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: query,
    });
  }

  @Post('/booking')
  async flightBooking(@Query() params: BookingFlightDto, @Res() res){
    // let item, result;
    // item = Math.random() >= 0.35; //true of false
    // if(item){
    //   result = "true";
    // }
    // else{
    //   result = "false";
    // }

    let status;
    const candidate = await this.flightRepository.findOne({flightNumber: params.flightNumber, seat: params.seat});
    let isAvailable = candidate.status;
    if(isAvailable === 'available'){
      status = 'booking success'
      let query = await this.flightRepository.update({ flightNumber: params.flightNumber, seat: params.seat, status: 'available' }, 
        {status: "booked", bookingUser: params.userName, bookedDate: Date.now()});
    }
    else{
      status = 'booking failed'
    }

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: status,
    });
  }

  @Post('/cancel-booking')
  async cancelBooking(@Query() params: CancelBookingFlightDto, @Res() res){
    let query = await this.flightRepository.update({ flightNumber: params.flightNumber, seat: params.seat }, 
        {status: "available", bookingUser: null, bookedDate: null});
    let status;
    if(query != undefined){
      status = 'cancel success'
    }
    else{
      status = 'cancel failed'
    }
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: status,
    });
  }

}
