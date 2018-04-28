import jwt from 'jwt-simple';

describe('Routes Books', () => {
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description',
  };

  let token;

  beforeEach((done) => {
    Users.destroy({ where: {} }).then(() => Users.create({
      name: 'John',
      email: 'john@email.com',
      password: '12345',
    }))
      .then((user) => {
        Books.destroy({ where: {} })
          .then(() => {
            Books.create(defaultBook);
          })
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      request
        .get('/books')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultBook.id);
          expect(res.body[0].name).to.be.eql(defaultBook.name);
          expect(res.body[0].description).to.be.eql(defaultBook.description);

          done(err);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a books', (done) => {
      request
        .get('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultBook.id);
          expect(res.body.name).to.be.eql(defaultBook.name);
          expect(res.body.description).to.be.eql(defaultBook.description);

          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a books', (done) => {
      const newBooks = {
        id: 2,
        name: 'New Book',
        description: 'Default description',
      };

      request.post('/books')
        .send(newBooks)
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newBooks.id);
          expect(res.body.name).to.be.eql(newBooks.name);
          expect(res.body.description).to.be.eql(newBooks.description);

          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a books', (done) => {
      const updateBooks = {
        id: 1,
        name: 'Update Book',
        description: 'Default description',
      };

      request.put('/books/1')
        .send(updateBooks)
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);

          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a books', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
