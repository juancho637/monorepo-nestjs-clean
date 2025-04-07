import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiServiceService {
  constructor(private readonly httpService: HttpService) {}

  async classification(data: any): Promise<any> {
    const body = {
      Inputs: {
        data: [
          {
            route_type: data?.route_type ?? 0,
            start_scan_to_end_scan: data?.start_scan_to_end_scan ?? 0,
            cutoff_factor: data?.cutoff_factor ?? 0,
            actual_distance_to_destination: data?.actual_distance_to_destination ?? 0,
            actual_time: data?.actual_time ?? 0,
            osrm_time: data?.osrm_time ?? 0,
            osrm_distance: data?.osrm_distance ?? 0,
            factor: data?.factor ?? 0,
            segment_actual_time: data?.segment_actual_time ?? 0,
            segment_factor: data?.segment_factor ?? 0,
          },
        ],
      },
      GlobalParameters: {
        method: 'predict',
      },
    };

    const response = await firstValueFrom(
      this.httpService.post('http://3602a0e6-3b6b-4432-a617-b1c6899ff54e.westus2.azurecontainer.io/score', body)
    );
     return response.data?.Results ? response.data.Results[0] : response.data;
  }

  async prediction(data: any): Promise<any> {
    const body = {
      Inputs: {
        data: [
          {
            route_type: data?.route_type ?? 0,
            start_scan_to_end_scan: data?.start_scan_to_end_scan ?? 0,
            cutoff_factor: data?.cutoff_factor ?? 0,
            actual_distance_to_destination: data?.actual_distance_to_destination ?? 0,
            osrm_time: data?.osrm_time ?? 0,
            osrm_distance: data?.osrm_distance ?? 0,
            factor: data?.factor ?? 0,
            segment_actual_time: data?.segment_actual_time ?? 0,
            segment_factor: data?.segment_factor ?? 0,
            is_delayed: data?.is_delayed ?? 0,
          },
        ],
      },
      GlobalParameters: 1,
    };

    const response = await firstValueFrom(
      this.httpService.post('http://21ad73fe-b7fd-480d-a2f0-d77c3ce5a3bd.westus2.azurecontainer.io/score', body)
    );
     return response.data?.Results ? response.data.Results[0] : response.data;
  }
}
