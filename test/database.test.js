const {MongoClient} = require('mongodb');
const {mongoURI,mongoDBName} = require('./testhelpers')
const { run } = require("../testauth/src/database");

describe('MongoDB tests', () => {
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
    
    
    connection.close();
  });

  it('should insert a doc into collection', async () => {
    const user = db.collection('ConnectTest');

    await user.deleteMany({});
    console.log("erased connecttest");

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await user.insertOne(mockUser);

    const insertedUser = await user.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);

    
  }, 70000);

  it('run() function should insert data correctly', async () => {
    await db.collection('JestTest').deleteMany({});
    console.log("erased jesttest");

    run("JestTest",null);
    const user = db.collection('JestTest');
    const insertedUser = await user.find({name:'test2item'});
    expect(insertedUser).toBeDefined();
  }, 70000);
});