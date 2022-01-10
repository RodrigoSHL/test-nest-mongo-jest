import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { testModule, usePipes } from './test.module';

const url = '/users';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await testModule.compile();

    app = moduleFixture.createNestApplication();
    usePipes(app);
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .expect(200)
      .expect((res) => {
        const [data] = res.body;
        
        expect(data).toHaveProperty('email');
        expect(data).toHaveProperty('lastName');
        expect(data).toHaveProperty('name');
      });
  });

  it('/users/id (GET)', () => {
    const urlWithId = '/users/61dc5c58af80cbd48647b851'
    const mockData = { name: 'example', lastName: 'example', email: 'example@gmail.com' };
    return request(app.getHttpServer())
      .get(urlWithId)
      .expect(200)
      .expect((res) => {
        const data = res.body;

        expect(data).toHaveProperty('email', mockData.email);
        expect(data).toHaveProperty('lastName', mockData.lastName);
        expect(data).toHaveProperty('name', mockData.name);
      });
  });

  describe('/users (POST)', () => {
    it('must return status 201 when operation is successful', () => {
      const mockData = { name: 'example', lastName: 'example', email: 'example@gmail.com' };

      return request(app.getHttpServer())
        .post(url)
        .send(mockData)
        .expect(201)
        .expect((res) => {
          const data = res.body;

          expect(data).toHaveProperty('email', mockData.email);
          expect(data).toHaveProperty('lastName', mockData.lastName);
          expect(data).toHaveProperty('name', mockData.name);
        });
    })

    it('must return status 400 when it fails', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({})
        .expect(400)
    })
  })

  afterAll(async () => {
    await app.close();
  });
});
