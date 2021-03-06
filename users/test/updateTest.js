
const assert = require('assert');
const User = require('../src/User');

describe('The updater', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation()
      .then(() => User.find({}) )
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex')
        done() })
      .catch((error) => { done(error) });
  }

  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done());
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done());
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done()
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done()
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done()
    );
  });

  it('Can increase postcount by one', (done) => {
    //1: get all users joe
    //2: Doe een increment op postCount met waarde 1
    User.updateMany({name: 'Joe'}, {$inc: {likes: 1}})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.likes === 1)
        done()
      })
      .catch((error) => {
        done(error)
      })
  });
});
