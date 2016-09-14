'use strict'

const path = require('path')
const Quark = require('proton-quark')
const _ = require('lodash')


/**
 * @class ControllersQuark
 * @classdesc This quark is for instance controllers
 * @author Luis Hernandez
 */
class ControllersQuark extends Quark {

  constructor(proton) {
    super(proton)
  }

  /**
   * @override
   * @method configure
   * @description Ask if the proton.app.controllers object exist, if not exist
   * the method create the proton.app.controllers object
   * @author Luis Hernandez
   */
  configure() {
    if (!this.proton.app.controllers) {
      this.proton.app.controllers = {}
    }
    return Promise.resolve()
  }

  /**
   * @override
   * @method initialize
   * @description instance all controllers of the app
   * @author Luis Hernandez
   */
  initialize() {
    _.forEach(this._controllers, (Controller, fileName) => {
      const controller = new Controller(this.proton)
      controller.fileName = fileName
      this._addControllerToApp(controller)
      return controller
    })
    return Promise.resolve()
  }

  _addControllerToApp(controller) {
    this.proton.app.controllers[controller.name] = controller
  }

  /**
   * @method controllers
   * @description This method get the export value of each controller present
   * in the controllers folder
   * @author Luis Hernandez
   * @return {Array} - All controllers exported values as an array
   */
  get _controllers() {
    const controllersPath = path.join(this.proton.app.path, '/api/controllers')
    return require('require-all')(controllersPath)
  }

}

module.exports = ControllersQuark
