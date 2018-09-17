
let TypeService = function () {
  return {
    /**
     * method to test if the given string is valid plus not empty-stringed
     * @param text
     * @returns {boolean}
     */
    isEmptyString: function (text) {
      return (!text || /^\s*$/.test(text))
    }
  }
}

export default (new TypeService())
