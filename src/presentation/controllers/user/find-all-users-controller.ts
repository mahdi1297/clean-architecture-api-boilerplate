import { Controller } from '~/application/ports/controllers/controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { User } from '~/domain/user/entities/user';
import { RequestModel } from '~/application/ports/requests/request-model';
import { FindAllUsersUseCase } from '~/application/ports/use-cases/user/find-all-users-use-case';

type FindAllUsersRequestModel = RequestModel<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  {
    order?: 'desc' | 'asc';
    limit?: number;
    offset?: number;
  }
>;

export class FindAllUsersController implements Controller<User[] | never> {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findAllUsersPresenter: Presenter<User[]>,
  ) {}

  async handleRequest(requestModel?: FindAllUsersRequestModel) {
    let query: FindAllUsersRequestModel['query'];

    if (requestModel && requestModel.query) {
      query = requestModel.query;
    }

    const users = await this.findAllUsersUseCase.findAll(query);
    return this.findAllUsersPresenter.response(users);
  }
}