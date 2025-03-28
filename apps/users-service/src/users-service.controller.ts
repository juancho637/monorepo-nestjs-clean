import { Controller } from '@nestjs/common';
import { UsersServiceService } from './users-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersServiceController {
  constructor(private readonly usersServiceService: UsersServiceService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello() {
    return 'Respuesta desde users-service';
  }
}
