import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  defaultRoute(): string {
    return 'Welcome to our Digital Solution';
  }
}