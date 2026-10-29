const assert = require("node:assert/strict");
const { test } = require("node:test");
const { add } = require("./app");

test("Addition test", () => {
    assert.equal(add(5, 3), 8);
});