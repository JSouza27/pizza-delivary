import { CreatePizzaDTO } from '../dto/create-pizza.dto';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { Pizza } from '../pizza.entity';

export interface IPizzaService {
  createPizza(createPizzaDto: CreatePizzaDTO): Promise<Pizza>;

  getAllPizzas(): Promise<Pizza[]>;

  findPizzaById(id: string): Promise<Pizza>;

  updatePizza(id: string, data: UpdatePizzaDTO): Promise<Pizza>;

  deletePizza(id: string): Promise<boolean>;
}
