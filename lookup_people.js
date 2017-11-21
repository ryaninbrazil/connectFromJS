const myArgs = process.argv.slice(2);
const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});



client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [myArgs[0]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows); 
    client.end();
  });
});