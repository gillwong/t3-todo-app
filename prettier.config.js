/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@trivago/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all",
  semi: true,
  importOrder: [
    "^@/app/(.*)$",
    "^@/lib/(.*)$",
    "^@/components/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
};

export default config;
