module.exports = {
  objFields: (obj, props) => {
    for (let i = 0; i < props.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(obj, props[i])) return false;
    }
    return true;
  },
};
