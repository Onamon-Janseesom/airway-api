import { BookingFlightDto } from './dto/booking-flight.dto';
import { FlightAvailableDto } from './dto/flight-available.dto';
import { Controller, Get, Body, HttpStatus, Res, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/index')
  getAllFlights(@Res() res): string {
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: "result",
    });
  }

  @Get('/flight')
  flightAvialble(@Query() params: FlightAvailableDto, @Res() res){
    let item, result;
    item = Math.random() >= 0.35; //true of false
    if(item){
      result = "true";
    }
    else{
      result = "false";
    }

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: {'flight available' : item},
    });
  }

  @Post('/booking')
  flightBooking(@Query() params: BookingFlightDto, @Res() res){
    let item, result;
    item = Math.random() >= 0.35; //true of false
    if(item){
      result = "true";
    }
    else{
      result = "false";
    }

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      content: {'booking status' : item},
    });
  }

}
