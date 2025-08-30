'use strict';

// Minimal in-memory shim for the app's SweetModel usage.

const dbs = new Map();

function getTable(dbName, tableName) {
  if (!dbs.has(dbName)) dbs.set(dbName, new Map());
  const tables = dbs.get(dbName);
  if (!tables.has(tableName)) tables.set(tableName, { rows: [], nextId: 1 });
  return tables.get(tableName);
}

export default class SweetModel {
  static databaseName() { return 'DB'; }
  static tableName() { return 'table'; }
  static dateFields() { return []; }

  static async all(sortField, sortOrder, raw = false) {
    const table = getTable(this.databaseName(), this.tableName());
    const list = table.rows.slice();
    if (sortField) {
      list.sort((a, b) => {
        const av = a[sortField];
        const bv = b[sortField];
        if (av === bv) return 0;
        return (sortOrder === 'DESC' ? (av < bv) : (av > bv)) ? 1 : -1;
      });
    }
    return raw ? list : list.map((r) => new this(r));
  }

  static async where(conditions, andOr = 'AND', sortField, sortOrder) {
    const table = getTable(this.databaseName(), this.tableName());
    let list = table.rows.slice();
    if (conditions) {
      list = list.filter((row) => {
        return Object.entries(conditions).every(([key, expr]) => {
          const [op, value] = String(expr).split('|');
          const target = row[key];
          if (op === 'EQ') return String(target) === String(value);
          if (op === 'LIKE') {
            const needle = String(value).replace(/^'|'$/g, '').toLowerCase();
            return String(target || '').toLowerCase().includes(needle);
          }
          return true;
        });
      });
    }
    if (sortField) {
      list.sort((a, b) => {
        const av = a[sortField];
        const bv = b[sortField];
        if (av === bv) return 0;
        return (sortOrder === 'DESC' ? (av < bv) : (av > bv)) ? 1 : -1;
      });
    }
    return list.map((r) => new this(r));
  }

  static async get(id) {
    const table = getTable(this.databaseName(), this.tableName());
    const row = table.rows.find((r) => r._id === id);
    return row ? new this(row) : null;
  }

  static async destroy_all() {
    const table = getTable(this.databaseName(), this.tableName());
    table.rows = [];
    table.nextId = 1;
  }

  async save(_, raw = false) {
    const table = getTable(this.constructor.databaseName(), this.constructor.tableName());
    if (!this._id || this._id < 0) {
      this._id = table.nextId++;
      table.rows.push({ ...this });
    } else {
      const idx = table.rows.findIndex((r) => r._id === this._id);
      if (idx >= 0) table.rows[idx] = { ...this };
      else table.rows.push({ ...this });
    }
    return raw ? this : this;
  }

  async destroy() {
    const table = getTable(this.constructor.databaseName(), this.constructor.tableName());
    table.rows = table.rows.filter((r) => r._id !== this._id);
  }
}


