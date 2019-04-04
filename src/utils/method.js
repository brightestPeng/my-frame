/**
 * 定义工具方法
 */

/**
 * 设置localStorage
 * @param {Object} obj
 */
const setLocalStorage = obj => {
  if (obj instanceof Object) {
    Object.keys(obj).forEach(index => {
      localStorage.setItem(index, obj[index]);
    });
  } else {
    throw new Error(
      "The method of setLocalStorage paramter type is not Object!"
    );
  }
};

/**
 * 获取localStorage
 * @param {String or Array} args
 */
const getLocalStorage = args => {
  if (typeof args === "string") {
    return localStorage.getItem(args)?localStorage.getItem(args):"";
  } else if (args instanceof Array) {
    let obj = {};
    args.forEach(index => {
      obj[index] = localStorage.getItem(index)?localStorage.getItem(index):"";
    });
    return obj;
  } else {
    throw new Error(
      "The method of getLocalStorage paramter type is not String/Array!"
    );
  };
};


export {
	setLocalStorage,getLocalStorage
}
