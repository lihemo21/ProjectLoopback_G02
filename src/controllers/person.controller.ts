import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PersonModel} from '../models';
import {PersonModelRepository} from '../repositories';

export class PersonController {
  constructor(
    @repository(PersonModelRepository)
    public personModelRepository : PersonModelRepository,
  ) {}

  @post('/person-models')
  @response(200, {
    description: 'PersonModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(PersonModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonModel, {
            title: 'NewPersonModel',
            exclude: ['id'],
          }),
        },
      },
    })
    personModel: Omit<PersonModel, 'id'>,
  ): Promise<PersonModel> {
    return this.personModelRepository.create(personModel);
  }

  @get('/person-models/count')
  @response(200, {
    description: 'PersonModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PersonModel) where?: Where<PersonModel>,
  ): Promise<Count> {
    return this.personModelRepository.count(where);
  }

  @get('/person-models')
  @response(200, {
    description: 'Array of PersonModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PersonModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PersonModel) filter?: Filter<PersonModel>,
  ): Promise<PersonModel[]> {
    return this.personModelRepository.find(filter);
  }

  @patch('/person-models')
  @response(200, {
    description: 'PersonModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonModel, {partial: true}),
        },
      },
    })
    personModel: PersonModel,
    @param.where(PersonModel) where?: Where<PersonModel>,
  ): Promise<Count> {
    return this.personModelRepository.updateAll(personModel, where);
  }

  @get('/person-models/{id}')
  @response(200, {
    description: 'PersonModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PersonModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PersonModel, {exclude: 'where'}) filter?: FilterExcludingWhere<PersonModel>
  ): Promise<PersonModel> {
    return this.personModelRepository.findById(id, filter);
  }

  @patch('/person-models/{id}')
  @response(204, {
    description: 'PersonModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonModel, {partial: true}),
        },
      },
    })
    personModel: PersonModel,
  ): Promise<void> {
    await this.personModelRepository.updateById(id, personModel);
  }

  @put('/person-models/{id}')
  @response(204, {
    description: 'PersonModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() personModel: PersonModel,
  ): Promise<void> {
    await this.personModelRepository.replaceById(id, personModel);
  }

  @del('/person-models/{id}')
  @response(204, {
    description: 'PersonModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personModelRepository.deleteById(id);
  }
}
