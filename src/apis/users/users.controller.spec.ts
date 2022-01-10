import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { User } from './user.model';
import { getModelToken } from '@nestjs/mongoose'
import { UsersService } from './users.service';
import { UserSerializer } from './serializers/user.serializer';
import { CreateUserDto } from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
    .overrideProvider(getModelToken(User.name)) // Busca dependencia y luego la reemplaza
    .useValue(jest.fn())
    .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('must return an Array of type UserSerializer ', async () => {
      jest.spyOn(usersService, 'findAll').mockImplementation(() =>
      Promise.resolve([{ name: 'example' }] as unknown as Promise<User[]>));

    const result = await controller.getUsers();

    expect(result).toHaveLength(1)
    expect(result[0] instanceof UserSerializer).toEqual(true)
    expect(usersService.findAll).toHaveBeenCalledTimes(1);
      

    });
  })

  describe('createUser', () => {
    it('must return an UserSerializer', async () => {
      jest.spyOn(usersService, 'create').mockImplementation(() =>
        Promise.resolve({ name: 'example' } as unknown as Promise<User>));

      const userCreated = await controller.createUser({ example: '' } as unknown as CreateUserDto);

      expect(userCreated instanceof UserSerializer).toEqual(true);
      expect(usersService.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('findUser', () => {
    it('must return an UserSerializer', async () => {
      jest.spyOn(usersService, 'findUser').mockImplementation(() =>
        Promise.resolve({ name: 'example' } as unknown as Promise<User>));

      const user = await controller.findUserById('1');

      expect(user instanceof UserSerializer).toEqual(true);
      expect(usersService.findUser).toHaveBeenCalledTimes(1);
    })
  })

});
