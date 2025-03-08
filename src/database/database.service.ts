import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      user: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('POSTGRES_DB'),
    });
  }

  async onModuleInit() {
    await this.pool.connect();
  }

  async query(query: string, params?: any[]) {
    return this.pool.query(query, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
