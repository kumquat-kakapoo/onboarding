import { test } from "node:test";
import { strictEqual } from "node:assert";
import { compare } from "../src/convert.js";

test("compare distance: first value greater", () => {
  const result = compare("distance", 5, "km", 3, "mi");
  // 5 km = 3.11 mi, so 5 km > 3 mi (3 mi = 4.83 km)
  strictEqual(result, "5 km is greater than 3 mi (4.83 km) by 0.17 km");
});

test("compare distance: second value greater", () => {
  const result = compare("distance", 3, "mi", 5, "km");
  // 3 mi = 4.83 km, so 3 mi < 5 km (5 km = 3.11 mi)
  strictEqual(result, "3 mi is less than 5 km (3.11 mi) by 0.11 mi");
});

test("compare distance: equal values", () => {
  const result = compare("distance", 1, "km", 0.621371, "mi");
  // 1 km ≈ 0.62 mi (rounded to 2 decimals), 0.621371 mi ≈ 1 km
  strictEqual(result, "1 km equals 0.621371 mi (1 km)");
});

test("compare weight: first value greater", () => {
  const result = compare("weight", 100, "g", 3, "oz");
  // 100 g = 3.53 oz, so 100 g > 3 oz (3 oz = 85.05 g)
  strictEqual(result, "100 g is greater than 3 oz (85.05 g) by 14.95 g");
});

test("compare weight: second value greater", () => {
  const result = compare("weight", 1, "oz", 50, "g");
  // 1 oz = 28.35 g, so 1 oz < 50 g (50 g = 1.76 oz)
  strictEqual(result, "1 oz is less than 50 g (1.76 oz) by 0.76 oz");
});

test("compare weight: equal values", () => {
  const result = compare("weight", 28.35, "g", 1, "oz");
  // 28.35 g ≈ 1 oz (rounded to 2 decimals)
  strictEqual(result, "28.35 g equals 1 oz (28.35 g)");
});

test("compare temperature: first value greater", () => {
  const result = compare("temperature", 100, "C", 200, "F");
  // 100 C = 212 F, so 100 C > 200 F (200 F = 93.33 C)
  strictEqual(result, "100 C is greater than 200 F (93.33 C) by 6.67 C");
});

test("compare temperature: equal values (F to C)", () => {
  const result = compare("temperature", 32, "F", 0, "C");
  // 32 F = 0 C, so they're equal (0 C converted to F = 32 F)
  strictEqual(result, "32 F equals 0 C (32 F)");
});

test("compare temperature: equal values (C to F)", () => {
  const result = compare("temperature", 0, "C", 32, "F");
  strictEqual(result, "0 C equals 32 F (0 C)");
});

test("compare distance with meters", () => {
  const result = compare("distance", 1000, "m", 1, "km");
  // 1000 m = 1 km, so they're equal
  strictEqual(result, "1000 m equals 1 km (1000 m)");
});

test("compare weight with pounds", () => {
  const result = compare("weight", 1, "lb", 16, "oz");
  // 1 lb = 16 oz, so they're equal
  strictEqual(result, "1 lb equals 16 oz (1 lb)");
});

test("compare handles negative values", () => {
  const result = compare("temperature", -10, "C", 14, "F");
  // -10 C = 14 F, so they're equal
  strictEqual(result, "-10 C equals 14 F (-10 C)");
});

