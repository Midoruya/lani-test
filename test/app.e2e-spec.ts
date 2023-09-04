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

  it('/template/ (GET)', async () => {
    const req = await request(app.getHttpServer())
      .get('/template/')
      .expect(200);
    console.log('/template/ (GET)', req.text);
  });
  it('/template/:id (GET)', async () => {
    const req = await request(app.getHttpServer())
      .get('/template/' + 2)
      .expect(200);
    console.log('/template/:id (GET)', req.text);
  });
  it('/template/ (POST)', async () => {
    const req = await request(app.getHttpServer())
      .post('/template/')
      .send({
        name: 'test',
        attributeFields: [
          { name: 'name', type: 'string' },
          { name: 'years', type: 'number' },
          { name: 'date', type: 'date' },
        ],
      })
      .expect(201);
    console.log('/template/ (POST)', req.text);
  });
  it('/document/ (POST)', async () => {
    const req = await request(app.getHttpServer())
      .post('/document/')
      .send({
        name: 'test',
        attributeFields: [
          { name: 'name', value: 'test' },
          { name: 'years', value: '32' },
          { name: 'date', value: '1993-05-03T00:00:00.000Z' },
        ],
        templateId: 5,
      })
      .expect(201);

    console.log('/document/ (POST)', req.text);
  });
  it('/document/ (GET)', async () => {
    const req = await request(app.getHttpServer())
      .get('/document/')
      .expect(200);
    console.log('/document/ (GET)', req.text);
  });
  it('/document/:id (GET)', async () => {
    const req = await request(app.getHttpServer())
      .get('/document/' + 3)
      .expect(200);
    console.log('/document/:id (GET)', req.text);
  });
  it('/document/:id (DELETE)', async () => {
    const req = await request(app.getHttpServer())
      .delete('/document/' + 1)
      .expect(200);
    console.log('/document/:id (DELETE)', req.text);
  });
  it('/document/ (PUT)', async () => {
    const req = await request(app.getHttpServer())
      .put('/document/')
      .send({
        id: 3,
        name: 'reasdasfas',
        attributeFields: [
          { name: 'name', value: 'dasdasdasdasdasd' },
          { name: 'years', value: '56315123' },
          { name: 'date', value: '1993-05-03T00:00:00.000Z' },
        ],
        templateId: 5,
      })
      .expect(200);
    console.log('/document/ (PUT)', req.text);
  });
});
