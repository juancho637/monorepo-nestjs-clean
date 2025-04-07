import { Controller } from '@nestjs/common';
import { UsersServiceService } from './users-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersServiceController {
  constructor(private readonly usersServiceService: UsersServiceService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello(data: any) {
    console.log('Hello from UsersService!' + data.index);

    return 'Hello from UsersService!';
    // try {

    //   throw new Error('Error en el servicio de usuarios');
    // } catch (error) {
    //   return 'error en el servicio de usuarios';
    // }
  }
}
