import initSqlJs from "sql.js";
import { useEffect, useState } from "react";

function App() {
  const [texts, setTexts] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      // const SQL = await initSqlJs({ locateFile: (file) => `./${file}` });
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
