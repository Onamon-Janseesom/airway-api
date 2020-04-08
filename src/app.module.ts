import { FlightEntity } from './entity/flight.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "airway.cil1xn4fd9qh.us-east-2.rds.amazonaws.com",
      "port": 3306,
      "username": "admin",
      "password": "313326339",
      "database": 'airway',
      "entities": ["dist/entity/**.entity{.ts,.js}"],
      "synchronize": true,
      "logging": true,
    }),
    TypeOrmModule.forFeature([FlightEntity])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
