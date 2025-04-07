import { Controller } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello() {
    console.log('Hello from AuthService!');

    // Esta respuesta será enviada de vuelta al gateway
    return 'Respuesta desde auth-service';
  }
}
