# Template for vite + react + typescript + sql.js

This is a template for vite + react + typescript + sql.js.

Below is the procedure to create this template.

Start with vite + react + typescript template.

```
npm create vite sql.js-vite -- --template react-ts
cd sql.js-vite
npm install
```

Add sql.js

```
npm install sql.js
npm install -D @types/sql.js
```

The sql.js package contains the sqlite wasm file in the dist directory. Your project needs to serve the wasm file from the public directory. Create a symbolic link to the wasm file in the public directory for local development.

```
cd public
ln -s ../node_modules/sql.js/dist/sql-wasm.wasm
```

Update App.tsx to use sql.js.

```typescript
import initSqlJs from "sql.js";
import { useEffect, useState } from "react";

function App() {
  const [texts, setTexts] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const SQL = await initSqlJs();
      const db = new SQL.Database();
      db.exec("CREATE TABLE text (id INTEGER PRIMARY KEY, value TEXT);");
      db.exec("INSERT INTO text (value) VALUES ('Hello World');");
      const result = db.exec("SELECT * FROM text");
      setTexts(result[0].values.map((value) => value[1]) as string[]);
    })();
  }, []);

  return (
    <div className="App">
      {texts.map((text) => (
        <div>{text}</div>
      ))}
    </div>
  );
}

export default App;
```

Run the app. The app should display "Hello World".

```
npm run dev
```
