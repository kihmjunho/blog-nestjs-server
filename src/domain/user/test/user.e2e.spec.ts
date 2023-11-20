import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as request from 'supertest';
import { User } from '../entities/user.entity';
import { UserRole } from '../user.role';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    dataSource = moduleRef.get<DataSource>(DataSource);

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    );
    await app.init();
  });

  beforeEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
  });

  describe('/users/signup POST', () => {
    it('회원가입에 성공한다면 상태코드 201으로 응답한다.', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({
          email: 'abc@naver.com',
          password: 'abcd',
          nickname: '이름',
          phoneNumber: '01051984332',
        });
      const { body } = response;
      expect(response.status).toBe(201);
      expect(body.email).toBeDefined();
    });

    it('중복된 이메일은 회원가입이 불가능합니다. 409 상태코드로 응답합니다.', async () => {
      // given(테스트 하기 전 데이터 셋팅), when(테스트), then(검증)

      // given
      await request(app.getHttpServer()).post('/users/signup').send({
        email: 'abc@naver.com',
        password: 'abcd',
        nickname: '이름',
        phoneNumber: '01051984332',
      });
      // const user = new User({
      //   email: 'abc@naver.com',
      //   password: 'abcd',
      //   nickname: '이름',
      //   phoneNumber: '01051984332',
      //   role: UserRole.NORMAL,
      // });
      // await dataSource.getRepository(User).save(user);

      // when
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send({
          email: 'abc@naver.com',
          password: 'abcd',
          nickname: '이름',
          phoneNumber: '01051984332',
        });
      const { body } = response;
      console.log(body);
      e;
      // then
      expect(response.status).toBe(409);
      expect(body.error).toBe('THIS_EMAIL_IS_ALREADY_DUPLICATED');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
