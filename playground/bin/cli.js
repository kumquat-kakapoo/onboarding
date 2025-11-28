#!/usr/bin/env node
import { convert, compare } from "../src/convert.js";

const [,, command, ...args] = process.argv;

if (!command) {
  console.error("Usage: convert <type> <value> [from] [to]");
  console.error("   or: convert compare <type> <value1> <unit1> <value2> <unit2>");
  process.exit(1);
}

if (command === "compare") {
  const [type, value1, unit1, value2, unit2] = args;
  if (!type || !value1 || !unit1 || !value2 || !unit2) {
    console.error("Usage: convert compare <type> <value1> <unit1> <value2> <unit2>");
    process.exit(1);
  }
  const result = compare(type, Number(value1), unit1, Number(value2), unit2);
  console.log(result);
} else {
  const [type, value, from, to] = [command, ...args];
  if (!type || !value) {
    console.error("Usage: convert <type> <value> [from] [to]");
    console.error("   or: convert compare <type> <value1> <unit1> <value2> <unit2>");
    process.exit(1);
  }
  const result = convert(type, Number(value), from, to);
  console.log(result);
}
