#!/usr/bin/env node
/** После export: .nojekyll, uploads, styles для GitHub Pages. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "out");
if (!fs.existsSync(OUT)) {
  process.exit(0);
}

const uploadsSrc = path.join(ROOT, "public", "uploads");
const uploadsDst = path.join(OUT, "uploads");
if (fs.existsSync(uploadsSrc)) {
  fs.cpSync(uploadsSrc, uploadsDst, { recursive: true });
  console.log("postbuild: copied public/uploads → out/uploads");
}

const stylesSrc = path.join(ROOT, "public", "styles");
const stylesDst = path.join(OUT, "styles");
if (fs.existsSync(stylesSrc)) {
  fs.cpSync(stylesSrc, stylesDst, { recursive: true });
  console.log("postbuild: copied public/styles → out/styles");
}

const nojekyll = path.join(OUT, ".nojekyll");
if (!fs.existsSync(nojekyll)) {
  fs.writeFileSync(nojekyll, "");
  console.log("postbuild: created out/.nojekyll");
}
