import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for input validation
// These tests should FAIL initially and pass after implementing validation

test("rejects non-numeric value", () => {
  throws(
    () => convert("temperature", "abc", "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for non-numeric input"
  );
});

test("rejects NaN value", () => {
  throws(
    () => convert("temperature", NaN, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for NaN"
  );
});

test("rejects unknown conversion type", () => {
  throws(
    () => convert("volume", 100, "L", "gal"),
    /unknown.*type/i,
    "Should throw error for unsupported conversion type"
  );
});

test("accepts valid numeric strings", () => {
  // Should convert string to number and process
  const result = convert("temperature", "100", "C", "F");
  strictEqual(result, 212);
});

test("accepts negative values", () => {
  const result = convert("temperature", -40, "C", "F");
  strictEqual(result, -40); // -40°C = -40°F (special case!)
});

test("accepts zero", () => {
  const result = convert("temperature", 0, "C", "F");
  strictEqual(result, 32);
});

// Tests for invalid unit codes
test("rejects invalid temperature 'from' unit", () => {
  throws(
    () => convert("temperature", 100, "X", "F"),
    /invalid unit code.*X.*temperature/i,
    "Should throw error for invalid temperature source unit"
  );
});

test("rejects invalid temperature 'to' unit", () => {
  throws(
    () => convert("temperature", 100, "C", "R"),
    /invalid unit code.*R.*temperature/i,
    "Should throw error for invalid temperature target unit"
  );
});

test("rejects invalid distance 'from' unit", () => {
  throws(
    () => convert("distance", 100, "cm", "mi"),
    /invalid unit code.*cm.*distance/i,
    "Should throw error for invalid distance source unit"
  );
});

test("rejects invalid distance 'to' unit", () => {
  throws(
    () => convert("distance", 100, "km", "ft"),
    /invalid unit code.*ft.*distance/i,
    "Should throw error for invalid distance target unit"
  );
});

test("rejects invalid weight 'from' unit", () => {
  throws(
    () => convert("weight", 100, "kg", "oz"),
    /invalid unit code.*kg.*weight/i,
    "Should throw error for invalid weight source unit"
  );
});

test("rejects invalid weight 'to' unit", () => {
  throws(
    () => convert("weight", 100, "g", "kg"),
    /invalid unit code.*kg.*weight/i,
    "Should throw error for invalid weight target unit"
  );
});

test("rejects both invalid units", () => {
  throws(
    () => convert("temperature", 100, "X", "Y"),
    /invalid unit code/i,
    "Should throw error when both units are invalid"
  );
});
