import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertDistance } from "../src/lib/distance.js";

test("converts kilometers to miles", () => {
  strictEqual(convertDistance(5, "km", "mi"), 5 * 0.621371);
  strictEqual(convertDistance(10, "km", "mi"), 10 * 0.621371);
});

test("converts miles to kilometers", () => {
  strictEqual(convertDistance(3, "mi", "km"), 3 / 0.621371);
  strictEqual(convertDistance(5, "mi", "km"), 5 / 0.621371);
});

test("converts meters to kilometers", () => {
  strictEqual(convertDistance(1000, "m", "km"), 1);
  strictEqual(convertDistance(500, "m", "km"), 0.5);
});

test("converts kilometers to meters", () => {
  strictEqual(convertDistance(1, "km", "m"), 1000);
  strictEqual(convertDistance(2.5, "km", "m"), 2500);
});

test("converts meters to miles", () => {
  strictEqual(convertDistance(1609.34, "m", "mi"), 1609.34 * 0.000621371);
  strictEqual(convertDistance(1000, "m", "mi"), 1000 * 0.000621371);
});

test("converts miles to meters", () => {
  strictEqual(convertDistance(1, "mi", "m"), 1 / 0.000621371);
  strictEqual(convertDistance(0.5, "mi", "m"), 0.5 / 0.000621371);
});
