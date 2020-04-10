// Blox
/**
 *
 *
 * @param {Dictionary} dataset
 * @param {Dictionary} settings
 * @param {Array} heads
 * @param {String} tableName
 * @return {void}
 */
function entries(dataset, settings, heads, tableName, subheads) {
  const table = settings.tables[tableName];
  const headers = table.fields;

  const entries = {
    header: false, info: false, heads: [], items: [],
  };
  let i = 0;
  let c = 0;
  for (index in dataset) {
    if (index > -1) {
      const row = dataset[index];
      entries.items[i] = { items: [], id: row[table.key] };

      for (head in row) {
        if (isDict(row[head])) {
          const subheaders = settings.tables[head].fields;

          for (subhead in row[head]) {
            if (subheads[head].indexOf(subhead) > -1) {
              entries.items[i].items[c] = processField(row[head][subhead], subhead, subheaders, settings);
              c++;
            }
            
          }
          c++;
        } else {
          if (heads.indexOf(head) > -1) {
            entries.items[i].items[c] = processField(row[head], head, headers, settings);
            c++;
          }
        }
      }
      i++;
    }
  }
  entries.heads = entries.heads.concat(processHeaders(heads, headers, settings));

  for (subtable in subheads) {
    if (subtable) {
      const subheaders = settings.tables[subtable].fields;
      entries.heads = entries.heads.concat(processHeaders(subheads[subtable], subheaders, settings));
    }

  }
  return entries;
}

/**
 *
 *
 * @param {Array} heads
 * @param {Dictionary} headers
 * @param {Dictionary} settings
 * @return {Dictionary}
 */
function processHeaders(heads, headers, settings) {
  const headersOut = [];
  for (let i = 0; i < heads.length; i++) {
    const item = processName(heads[i], headers);
    item.main = item.name;
    headersOut[i] = item;
  }
  return headersOut;
}

/**
 *
 *
 * @param {String} field
 * @param {Dictionary} headers
 * @return {Dictionary}
 */
function processName(field, headers) {
  let type = "unset";
  let subtype = "unset";
  const id = field.toLowerCase();
  if (id in headers) {
    name = headers[id].header;
    type = headers[id].type;
    subtype = headers[id].subtype;
  }
  let classes = "field-" + type + " field-" + type + "-" + subtype;
  return { main: "", name: name, id: id, classes: classes, type: type, subtype: subtype };
}

/**
 *
 *
 * @param {*} data
 * @param {String} field
 * @param {Array} headers
 * @param {Dictionary} settings
 * @return {Dictionary}
 */
function processField(data, field, headers, settings) {
  const item = processName(field, headers);
  let main = '';
  if (data == null || data == undefined) {
    main = settings.icons.Empty;
    item.classes += ' field-empty';
  } else if (item.type === "image") {
    main = '<img class="field-' + item.field + '" src="' + data.toString() + '" />';
  } else if (item.type === "date") {
    const dateStr = data.toLocaleDateString('en-GB');
    const timeStr = data.toLocaleTimeString('en-GB');
    if (item.subtype === "date") {
      main = '<span>' + dateStr + '</span>';
    } else if (item.subtype === "time") {
      main = '<span>' + timeStr + '</span>';
    } else {
      main = '<span class="date">' + dateStr + '</span> <span class="time">' + timeStr + '</span>';
    }
  } else if (item.type === "array") {
    main = '<span>' + data.toString() + '</span>';
  } else if (item.type === "boolean") {
    if (data) {
      main = settings.icons.True;
    } else {
      main = settings.icons.False;
    }
  } else {
    main = '<span>' + data.toString() + '</span>';
  }

  item.main = main;
  item.data = data;
  return item;
}

module.exports = {
  entries,
};


/**
 *
 *
 * @param {*} v
 * @return {boolean}
 */
function isDict(v) {
  return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date) && !(v instanceof Buffer);
}