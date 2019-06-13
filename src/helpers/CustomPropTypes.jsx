const customPropTypes = {
  MaxLength: MaxLength
};

/**
 * @augments {reducerName: string, maxLength:number}
 */
function MaxLength(reducerName, maxLength) {
  return function(props, propName, componentName) {
    if (props[reducerName][propName]) {
      if (props[reducerName][propName].length > maxLength) {
        return new Error(
          "Invalid prop " +
            propName +
            " length supplied to " +
            componentName +
            ". Validation failed. MaxLength is " +
            maxLength +
            " characters."
        );
      }
    }
  };
}

export default customPropTypes;
