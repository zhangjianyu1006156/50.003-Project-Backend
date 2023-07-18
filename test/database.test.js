const {MongoClient} = require('mongodb');
const {mongoURI,mongoDBName} = require('./testhelpers')

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    // const client = new MongoClient(mongoURI);
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(mongoDBName);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const user = db.collection('User');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await user.insertOne(mockUser);

    const insertedUser = await user.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  }, 70000);
});