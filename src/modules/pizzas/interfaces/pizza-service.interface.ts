import { CreatePizzaDTO } from '../dto/create-pizza.dto';
import { DeletePizzaResponseDTO } from '../dto/delete-pizza-response.dto';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { Pizza } from '../Entity/pizza.entity';

export interface IPizzaService {
  create(createPizzaDto: CreatePizzaDTO): Promise<Pizza>;

  findAll(): Promise<Pizza[]>;

  findById(id: string): Promise<Pizza>;

  update(id: string, data: UpdatePizzaDTO): Promise<Pizza>;

  delete(id: string): Promise<DeletePizzaResponseDTO>;
}
