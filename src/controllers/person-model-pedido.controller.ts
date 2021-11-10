import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  PersonModel,
  Pedido,
} from '../models';
import {PersonModelRepository} from '../repositories';

export class PersonModelPedidoController {
  constructor(
    @repository(PersonModelRepository) protected personModelRepository: PersonModelRepository,
  ) { }

  @get('/person-models/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of PersonModel has many Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.personModelRepository.pedidos(id).find(filter);
  }

  @post('/person-models/{id}/pedidos', {
    responses: {
      '200': {
        description: 'PersonModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PersonModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInPersonModel',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) pedido: Omit<Pedido, 'id'>,
  ): Promise<Pedido> {
    return this.personModelRepository.pedidos(id).create(pedido);
  }

  @patch('/person-models/{id}/pedidos', {
    responses: {
      '200': {
        description: 'PersonModel.Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Partial<Pedido>,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.personModelRepository.pedidos(id).patch(pedido, where);
  }

  @del('/person-models/{id}/pedidos', {
    responses: {
      '200': {
        description: 'PersonModel.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.personModelRepository.pedidos(id).delete(where);
  }
}
