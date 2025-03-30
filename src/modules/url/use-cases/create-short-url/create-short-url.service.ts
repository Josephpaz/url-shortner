import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/core/use-case';

@Injectable()
export class CreateShortUrlService implements UseCase<> {}
