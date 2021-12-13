const dbConnection = require('./config/mongoConnection');
const data = require('./data/');
const users = data.users;
const posts = data.posts;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  const patrick = await users.addUser('Patrick', '123456','phill@gmail.com','male','Hoboken');
  const id = patrick._id;
  const firstPost = await posts.addPost(
    'Hello!',
    'Today I found something interesting!',
    'furniture',
    'unknown',
    '1101 Adams St',
    'Patrick'
  );
  const second = await posts.addPost(
    'Using the seed',
    'Today I am happy and i found something cool!',
    'household',
    'unknown',
    '234 Washington St',
    'Patrick'
  );
  

  console.log('Done seeding database');
  await db.serverConfig.close();
};

main().catch(console.log);