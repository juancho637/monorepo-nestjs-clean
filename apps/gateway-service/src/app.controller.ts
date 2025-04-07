import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    @Inject('AI_SERVICE') private readonly aiClient: ClientProxy,
  ) {}

  @Get('call-auth')
  async callAuthService() {
    // Envía un mensaje con el patrón { cmd: 'getHello' }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await lastValueFrom(
        this.authClient.send(
          { cmd: 'getHello' },
          {
            /* datos opcionales */
          },
        ),
      );

      console.log('Response from auth service:', response);
      return { response };
    } catch (error) {
      console.log('Error from auth service:', error);
      return { error: 'Error from auth service' };
    }
  }

  @Get('call-users')
  callUsersService() {
    for (let index = 0; index < 200; index++) {
      this.usersClient.emit(
        { cmd: 'getHello' },
        {
          index,
        },
      );
    }

    return 'Hello from UsersService!';
  }

  @Post('call-ai-classification')
  async callAiClassification(@Body() payload: any) {
    // El payload puede contener los datos que se requieran para el modelo
    const response = await lastValueFrom(
      this.aiClient.send({ cmd: 'classification' }, payload),
    );
    return { response };
  }

  @Post('call-ai-prediction')
  async callAiPrediction(@Body() payload: any) {
    const response = await lastValueFrom(
      this.aiClient.send({ cmd: 'prediction' }, payload),
    );
    return { response };
  }
}
