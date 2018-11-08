const assert = require('assert');
const User = require('../src/User');

describe('The creater', () => {

  it('creates a user', (done) => {
    const joe = new User({name: "Joe"});
    joe.save()
      .then(() => {
        assert(!joe.isNew)
        done()
      })
      .catch((err) => done(err))
  });
});
