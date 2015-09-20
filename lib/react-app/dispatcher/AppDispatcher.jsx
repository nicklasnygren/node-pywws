import Dispatcher from './Dispatcher';

const EVENT_SOURCE = 'VIEW_ACTION';

/**
 * @class AppDispatcher
 *
 * TODO: Add description
 */
class AppDispatcher extends Dispatcher {

  /**
   * @constructs AppDispatcher
   */
  constructor() {
    super();
    
    // Constructor
  }

  /**
   * @function handleViewAction
   * @param {*} action
   */
  handleViewAction(action) {
    this.dispatch({
      source: EVENT_SOURCE,
      action: action
    });
  }
}

const _singletonInstance = new AppDispatcher();

export default _singletonInstance;

