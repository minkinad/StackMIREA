import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const docsRoot = path.join(projectRoot, "docs");
const contentRoot = path.join(projectRoot, "content");

const SECTION_INDEX = {
  java: {
    file: "index.mdx",
    body: `---\ntitle: Java\ndescription: 24 Java-практики с кодом из реальных исходников.\norder: 1\n---\n\n## Что внутри\n\n- 24 практики по Java\n- OOP, интерфейсы, очереди, GUI, MVC, паттерны\n- Код и структура напрямую из \`pr_Java/\`\n`
  },
  python: {
    file: "index.mdx",
    body: `---\ntitle: Python\ndescription: Практики Python и AI-ноутбуки в едином docs-формате.\norder: 1\n---\n\n## Что внутри\n\n- Практики по OOP, тестированию, ФВП и regex\n- AI-блок: Notebook1..Notebook8\n- Код и примеры из \`pr_Python/\`\n`
  },
  algorithms: {
    file: "index.mdx",
    body: `---\ntitle: Algorithms\ndescription: Вводные и вспомогательные материалы StackMIREA Docs.\norder: 1\n---\n\n## Что внутри\n\n- Введение и навигация по проекту\n- MDX-структура и правила оформления\n- Связь с Python и Java треками\n`
  }
};

const ALGORITHMS_GETTING_STARTED = `---
title: Getting Started
description: How to navigate StackMIREA documentation.
order: 2
---

## Навигация

Используйте левый sidebar для перехода между разделами, а правый блок **On this page** для перехода по секциям текущего документа.

## Формат материалов

- теория
- код
- разбор
- важные замечания

## Дальше

Откройте разделы Python и Java через главную страницу.
`;

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function walk(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function writeFileIfChanged(filePath, content) {
  if (fs.existsSync(filePath)) {
    const current = fs.readFileSync(filePath, "utf-8");
    if (current === content) {
      return;
    }
  }

  fs.writeFileSync(filePath, content);
}

function writeFileIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
}

function main() {
  ensureDirectory(contentRoot);

  if (fs.existsSync(docsRoot)) {
    const sourceFiles = walk(docsRoot);

    for (const sourceFile of sourceFiles) {
      const relative = path.relative(docsRoot, sourceFile);
      const sourceContent = fs.readFileSync(sourceFile, "utf-8");
      let targetRelative;

      if (relative === "intro.md" || relative === "intro.mdx") {
        targetRelative = path.join("algorithms", "getting-started.mdx");
      } else {
        targetRelative = relative.replace(/\.md$/i, ".mdx");
      }

      const targetPath = path.join(contentRoot, targetRelative);
      ensureDirectory(path.dirname(targetPath));
      writeFileIfChanged(targetPath, sourceContent);
    }
  }

  for (const [section, config] of Object.entries(SECTION_INDEX)) {
    const sectionDir = path.join(contentRoot, section);
    ensureDirectory(sectionDir);
    writeFileIfChanged(path.join(sectionDir, config.file), config.body);
  }

  writeFileIfMissing(path.join(contentRoot, "algorithms", "getting-started.mdx"), ALGORITHMS_GETTING_STARTED);
}

main();
