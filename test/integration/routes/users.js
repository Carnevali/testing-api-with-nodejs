import jwt from 'jwt-simple';

describe('Routes Users', () => {
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'test@mail.com',
    password: 'test',
  };

  let token;

  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() => Users.create({
        name: 'John',
        email: 'john@email.com',
        password: '12345',
      }))
      .then(() => {
        Users.create(defaultUser)
          .then((user) => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /user', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);

          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a users', (done) => {
      request
        .get('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);

          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a users', (done) => {
      const newUsers = {
        id: 2,
        name: 'New User',
        email: 'test2@mail.com',
        password: 'test',
      };

      request.post('/users')
        .send(newUsers)
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUsers.id);
          expect(res.body.name).to.be.eql(newUsers.name);
          expect(res.body.email).to.be.eql(newUsers.email);

          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a users', (done) => {
      const updateUsers = {
        id: 1,
        name: 'Update User',
        email: 'update@mail.com',
      };

      request.put('/users/1')
        .send(updateUsers)
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);

          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
