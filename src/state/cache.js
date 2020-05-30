import { get, set } from "lodash";

export default class Cache {
  entitiesAtLocation = {};
  dijkstraMaps = {
    player: {},
    playerReverse: {},
  };

  serialize() {
    const entitiesAtLocation = Object.keys(this.entitiesAtLocation).reduce(
      (acc, val) => {
        acc[val] = [...this.entitiesAtLocation[val]];
        return acc;
      },
      {}
    );

    const dijkstraMaps = this.dijkstraMaps;

    return {
      entitiesAtLocation,
      dijkstraMaps,
    };
  }

  clear() {
    this.entitiesAtLocation = {};
    this.dijkstraMaps = {};
  }

  deserialize(data) {
    this.clear();

    this.dijkstraMaps = data.dijkstraMaps;
    this.entitiesAtLocation = Object.keys(data.entitiesAtLocation).reduce(
      (acc, val) => {
        acc[val] = new Set(data.entitiesAtLocation[val]);
        return acc;
      },
      {}
    );
  }

  addSet(name, key, value) {
    if (!this.validate(name, key, "addSet")) return;

    if (this[name][key]) {
      this[name][key].add(value);
    } else {
      this[name][key] = new Set();
      this[name][key].add(value);
    }
  }

  readSet(name, key, value) {
    if (!this.validate(name, key, "readSet")) return;

    if (value) {
      return this[name][key].get(value);
    }

    return this[name][key];
  }

  addObj(name, path, value) {
    set(this[name], path, value);
  }

  readObj(name, path) {
    return get(this[name], path);
  }

  delete(name, key, value) {
    if (!this.validate(name, key, "delete")) return;

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

  validate(name, key, operation) {
    if (operation === "add") {
      if (!this[name]) {
        console.warn(`Cannot "${operation}". Cache "${name}" does not exist`);
        return false;
      }
    }

    if (operation === "read") {
      if (!this[name]) {
        console.warn(`Cannot "${operation}". Cache "${name}" does not exist`);
        return false;
      }

      if (key && !this[name][key]) {
        console.warn(
          `Cannot "${operation}". Cache ${name}.${key} does not exist`
        );
        return false;
      }
    }

    return true;
  }
}
