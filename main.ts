// The Excuse That Almost Works — make.fun entry.
// Reads the single-line excuse from entry.txt at the repo root and writes
// it, byte for byte, to entry.txt inside the grader's output directory.
// Stdlib only, no network, no wall clock.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(repoRoot, "entry.txt");

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(repoRoot, "output");

const raw = readFileSync(sourcePath, "utf8");
// Strip only the file's trailing newline, so the written line stays
// byte-for-byte identical to the excuse itself.
const text = raw.replace(/\r?\n$/, "");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), text, "utf8");
