import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

const VALID_UNITS = {
  temperature: ["C", "F", "K"],
  distance: ["km", "mi", "m"],
  weight: ["g", "oz", "lb"],
};

function validateNumericValue(value) {
  const num = Number(value);
  if (isNaN(num) || typeof value === "boolean") {
    throw new Error("Invalid numeric value");
  }
  return num;
}

function validateUnits(type, from, to) {
  const validUnits = VALID_UNITS[type];
  if (!validUnits) {
    throw new Error("Unknown type " + type);
  }
  if (!validUnits.includes(from)) {
    throw new Error(`Invalid unit code '${from}' for ${type}`);
  }
  if (!validUnits.includes(to)) {
    throw new Error(`Invalid unit code '${to}' for ${type}`);
  }
}

function roundToPrecision(value, precision) {
  return Number(value.toFixed(precision));
}

export function convert(type, value, from, to) {
  const numericValue = validateNumericValue(value);

  switch (type) {
    case "temperature":
      const tempFrom = from || defaults.temperature.defaultFrom;
      const tempTo = to || defaults.temperature.defaultTo;
      validateUnits(type, tempFrom, tempTo);
      return roundToPrecision(temperature.convertTemperature(numericValue, tempFrom, tempTo), defaults.precision);
    case "distance":
      validateUnits(type, from, to);
      return roundToPrecision(distance.convertDistance(numericValue, from, to), defaults.precision);
    case "weight":
      validateUnits(type, from, to);
      return roundToPrecision(weight.convertWeight(numericValue, from, to), defaults.precision);
    default:
      throw new Error("Unknown type " + type);
  }
}

export function compare(type, value1, unit1, value2, unit2) {
  const numValue1 = validateNumericValue(value1);
  const numValue2 = validateNumericValue(value2);
  
  validateUnits(type, unit1, unit1);
  validateUnits(type, unit2, unit2);

  // Convert both values to unit1 for comparison
  const convertedValue1 = numValue1; // Already in unit1
  const convertedValue2 = convert(type, numValue2, unit2, unit1);

  const diff = roundToPrecision(convertedValue1 - convertedValue2, defaults.precision);
  const absDiff = Math.abs(diff);

  // Check if values are equal (within precision tolerance)
  const tolerance = Math.pow(10, -defaults.precision - 1);
  if (absDiff < tolerance) {
    return `${numValue1} ${unit1} equals ${numValue2} ${unit2} (${convertedValue2} ${unit1})`;
  } else if (convertedValue1 > convertedValue2) {
    return `${numValue1} ${unit1} is greater than ${numValue2} ${unit2} (${convertedValue2} ${unit1}) by ${absDiff} ${unit1}`;
  } else {
    return `${numValue1} ${unit1} is less than ${numValue2} ${unit2} (${convertedValue2} ${unit1}) by ${absDiff} ${unit1}`;
  }
}
