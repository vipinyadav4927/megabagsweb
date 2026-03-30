import { promises as fs } from "node:fs";
import path from "node:path";

async function main() {
  const root = process.cwd();
  const src = path.join(root, "env.json");
  const distDir = path.join(root, "dist");
  const dest = path.join(distDir, "env.json");

  await fs.mkdir(distDir, { recursive: true });
  await fs.copyFile(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

