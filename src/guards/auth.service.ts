import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '../http.service';
import { strict } from 'assert';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('CustomHttpService')
    private readonly httpService: HttpService,
  ) {}

  async validateToken(token: string) {
    const message: String = 'dddd';
    const response = await this.httpService.post<User>('http://localhost:3012/auth/validateToken',
      { message },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }
    );
    //const response = await this.httpService.get('http://localhost:3012/auth/moshe');
    return response.data;
  }
}