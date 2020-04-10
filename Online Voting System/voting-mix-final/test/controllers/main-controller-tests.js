const sinonModule = require('sinon');

describe('main-controller-tests', () => {
  it('goto_index should render pages/index', () => {
    // setup mock data
    const req = {};
    const data = {};
    const mainController =
      require('../../src/server/controllers/core/main-controller')({data});

    // describe express' res object to be mocked
    const res = {
      status() {
        return this;
      },
      render() {
        return this;
      },
      redirect() {
        return this;
      },
    };

    // set assertions
    const expectedRoute = 'pages/index';
    const resMock = sinonModule.mock(res);
    resMock
        .expects('render')
        .returnsThis()
        .withArgs(expectedRoute)
        .once();

    mainController.goto_index(req, res);
  });
});
