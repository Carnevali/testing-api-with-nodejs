import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list of books', () => {
      const Books = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2018-04-25T15:05:56.6922',
        updated_at: '2018-04-25T15:05:56.6922',
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get all books: getById()', () => {
    it('should return a books', () => {
      const Books = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2018-04-25T15:05:56.6922',
        updated_at: '2018-04-25T15:05:56.6922',
      };

      td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a books: create()', () => {
    it('should create a books', () => {
      const Books = {
        create: td.function(),
      };

      const resquestBody = {
        name: 'Test Book',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2018-04-25T15:05:56.6922',
        updated_at: '2018-04-25T15:05:56.6922',
      };

      td.when(Books.create(resquestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.create(resquestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a books: update()', () => {
    it('should update on existing books', () => {
      const Books = {
        update: td.function(),
      };

      const resquestBody = {
        id: 1,
        name: 'Test Book Updated',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book Updated',
        created_at: '2018-04-25T15:05:56.6922',
        updated_at: '2018-04-25T15:05:56.6922',
      };

      td.when(Books.update(resquestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.update(resquestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(200);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Delete a books: delete()', () => {
    it('should delete on existing books', () => {
      const Books = {
        destroy: td.function(),
      };

      td.when(Books.destroy({ where: { id: 1 } })).thenResolve([]);

      const booksController = new BooksController(Books);
      return booksController.delete({ id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(204);
        });
    });
  });
});
