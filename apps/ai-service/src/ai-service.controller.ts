import { Controller } from '@nestjs/common';
import { AiServiceService } from './ai-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AiServiceController {
  constructor(private readonly aiServiceService: AiServiceService) {}

  @MessagePattern({ cmd: 'classification' })
  async classification(data: any) {
    console.log('Classification data:', data);

    return this.aiServiceService.classification(data);
  }

  @MessagePattern({ cmd: 'prediction' })
  async prediction(data: any) {
    console.log('Prediction data:', data);

    return this.aiServiceService.prediction(data);
  }
}
