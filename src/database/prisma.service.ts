import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  //   constructor() {
  //     super({
  //     });
  //     this.logger.log('PrismaService constructor');
  //   }
  async onModuleInit() {
    try {
      this.logger.log('Connecting to DB...');
      await this.$connect();
      this.logger.log('DB Connected');
    } catch (err) {
      this.logger.error('DB connection failed', err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
