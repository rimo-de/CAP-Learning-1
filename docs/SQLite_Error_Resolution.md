# CAP Version Alignment

## Purpose
Fix CAP startup issues caused by version mismatch between:
- Project dependency `@sap/cds`
- Global CLI `@sap/cds-dk`
- SQLite native bindings


- Step 1: Show current environment (optional but useful)

```bash
node -v
cds --version
npm list @sap/cds || true
```

- Step 2: Upgrade CAP runtime to match cds-dk (v9)

```bash
npm install @sap/cds@latest --save
```

Optional: ensure SQLite adapter is present for local dev

```bash
npm install @cap-js/sqlite@latest --save-dev
```

- Step 3: Clean install to avoid version conflicts

```bash
rm -rf node_modules package-lock.json
npm install
```

- Step 4: Verify final versions

```bash
npm list @sap/cds
cds --version
```

- Step 5: Run CAP application

```bash
cds watch
```