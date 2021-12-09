function validString(strng) {
  if (!strng || typeof strng !== "string" || !strng.trim()) return false;
  return true;
}

function validBoolean(bool) {
  if (typeof bool !== "boolean") return false;
  return true;
}

function convertId(id) {
  id._id = id._id.toString();
  return id;
}

function generateList(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

module.exports = {
  validString,
  convertId,
  validBoolean,
  generateList,
};
