import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  PersonModel,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoPersonModelController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/person-model', {
    responses: {
      '200': {
        description: 'PersonModel belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PersonModel)},
          },
        },
      },
    },
  })
  async getPersonModel(
    @param.path.string('id') id: typeof Pedido.prototype.id,
  ): Promise<PersonModel> {
    return this.pedidoRepository.person(id);
  }
}
