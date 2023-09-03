import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const req = await request(app.getHttpServer())
      .get('/template/')
      .expect(200);
    console.log(req.text);
  });
  it('/:id (GET)', async () => {
    const req = await request(app.getHttpServer())
      .get('/template/' + 2)
      .expect(200);
    console.log(req.text);
  });
  it('/ (POST)', async () => {
    const req = await request(app.getHttpServer())
      .post('/template/')
      .send({
        name: 'test',
        attributeFields: [
          { name: 'dsadas', type: 'string' },
          { name: 'dsadas', type: 'number' },
        ],
      })
      .expect(201);
    console.log(req.text);
  });
});
