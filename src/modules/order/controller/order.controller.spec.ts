import { Test, TestingModule } from '@nestjs/testing';
import { Orderontroller } from './order.controller';

describe('ControllerController', () => {
  let controller: Orderontroller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Orderontroller],
    }).compile();

    controller = module.get<Orderontroller>(Orderontroller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
