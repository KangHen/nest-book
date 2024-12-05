import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(TypeORMConfig),
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
