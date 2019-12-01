'use strict'

/**
	* Represents a Category in the database.
	*/
class Category {
	/**
	 * @param {string} name - Name of the Category
	 */
	constructor(name) {
		/**
		 * ID of the Category
		 * @private
		 * @member {number}
		 */
		this.id = -1

		/**
		 * Name of the Category
		 * @member {string}
		 */
		this.name = name
	}
}

module.exports = Category
