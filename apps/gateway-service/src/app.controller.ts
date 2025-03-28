import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
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
    const response = await lastValueFrom(
      this.authClient.send(
        { cmd: 'getHello' },
        {
          /* datos opcionales */
        },
      ),
    );

    return { response };
  }

  @Get('call-users')
  async callUsersService() {
    const response = await lastValueFrom(
      this.usersClient.send(
        { cmd: 'getHello' },
        {
          /* datos opcionales */
        },
      ),
    );

    return { response };
  }

  @Post('call-ai-classification')
  async callAiClassification(@Body() payload: any) {
    // El payload puede contener los datos que se requieran para el modelo
    const response = await lastValueFrom(
      this.aiClient.send({ cmd: 'classification' }, payload)
    );
    return { response };
  }

  @Post('call-ai-prediction')
  async callAiPrediction(@Body() payload: any) {
    const response = await lastValueFrom(
      this.aiClient.send({ cmd: 'prediction' }, payload)
    );
    return { response };
  }
}
