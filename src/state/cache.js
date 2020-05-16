export default class Cache {
  entitiesAtLocation = {};

  validate(name, operation) {
    if (!this[name]) {
      throw new Error(`Cannot "${operation}". Cache "${name}" does not exist`);
    }

    return true;
  }

  add(name, key, value) {
    this.validate(name, "add");

    if (this[name][key]) {
      this[name][key].add(value);
    } else {
      this[name][key] = new Set();
      this[name][key].add(value);
    }
  }

  read(name, key, value) {
    this.validate(name, "read");

    if (value) return this[name][key][value];
    return this[name][key];
  }

  delete(name, key, value) {
    this.validate(name, "delete");

    if (this[name][key].has(value)) {
      this[name][key].delete(value);
    }
  }

  print(name, key) {
    if (!name) {
      return console.log(this);
    }

    if (name && !key) {
      return console.log(this[name]);
    }

    if (name && key) {
      return console.log(this[name][key]);
    }
  }
}
