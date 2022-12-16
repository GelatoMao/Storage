const config = {
  type: "localStorage", // localStorage/sessionStorage
  prefix: "SDF_0.0.1", // program + version
  expire: 1, // expire time
};

// auto add prefix
export const autoAddPrefix = (key) => {
  const prefix = config.prefix ? config.prefix + "_" : "";
  return prefix + key;
};

// hasStorage
export const hasStorage = (key) => {
  key = autoAddPrefix(key);
  let arr = getAllStorage().filter((item) => {
    item.key === key;
  });
  return arr.length ? true : false;
};

// getAllStorageKeys
export const getAllStorageKeys = () => {
  let arr = getAllStorage(),
    keys = [];
  for (let i = 0; i < arr.length; i++) {
    keys.push(arr[i].key);
  }
  return keys;
};

// getAllStorage
export const getAllStorage = () => {
  const len = window[config.type].length;
  let arr = new Array(len);
  for (let i = 0; i < len; i++) {
    const keyName = window[config.type].key(i);
    const value = window[config.type].getItem(keyName);
    arr[i] = { key: keyName, value: value };
  }
  return arr;
};

// removeStorage
export const removeStorage = (key) => {
  window[config.type].removeItem(key);
};

// clearStorage
export const clearStorage = () => {
  window[config.type].clear();
};

// setStorage
export const setStorage = (key, value, expire = 0) => {
  if (value === "" || value === null || value === undefined) {
    value = null;
  }
  if (isNaN(expire) || expire < 0)
    throw new Error("Expire time must be a number");
  expire = (expire ? expire : config.expire) * 1000;
  let data = {
    value: value,
    time: Date.now(),
    expire: expire,
  };
  window[config.type].setItem(autoAddPrefix(key), JSON.stringify(data));
};

// getStorage
export const getStorage = (key) => {
  let prefixKey = autoAddPrefix(key);
  if (
    !window[config.type].getItem(prefixKey) ||
    JSON.stringify(window[config.type].getItem(prefixKey)) === "null"
  ) {
    return null;
  }
  const storage = JSON.parse(window[config.type].getItem(prefixKey));
  let nowTime = Date.now();
  if (storage.expire < nowTime - storage.time) {
    removeStorage(key);
    return null;
  } else {
    return storage.value;
  }
};
