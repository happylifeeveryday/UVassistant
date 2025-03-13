const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Client } = require("pg");

admin.initializeApp();

exports.queryTestTable = functions.
    https.onCall(async () => {

      const client = new Client({
        host: "database-1.c3omkga8m309.ap-southeast-2.rds.amazonaws.com",
        user: "postgres",
        password: "K2Zs6mOqmuarTKUYLRAK",
        database: "UVAssistant",
        port: 5432,
      });

      try {
        await client.connect();
        const result = await client.query("SELECT * FROM test_table;");
        await client.end();
        return { rows: result.rows };
      } catch (error) {
        await client.end();
        throw new functions.https.HttpsError(
          "internal",
          "Database query failed: " + error.message
        );
      }
    });
