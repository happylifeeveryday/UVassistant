const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Client } = require("pg");

admin.initializeApp();

exports.testGetDataFromDatabase = functions
    .https.onCall({ region: "australia-southeast1" },async () => {

      const client = new Client({
        host: 'database-1.c3omkga8m309.ap-southeast-2.rds.amazonaws.com',  // RDS Endpoint
        port: 5432,                   
        database: 'UVAssistant',      
        user: 'postgres',             
        password: 'K2Zs6mOqmuarTKUYLRAK', 
        ssl: {
          rejectUnauthorized: false  
        }
      });

      try {
        await client.connect();
        console.log('The database connection was successful!');
    
        // Executing SQL Queries
        const res = await client.query('SELECT * FROM test_table;');

        return { rows: res.rows };
    
      } catch (err) {
        console.error('Database connection or query error:', err.stack);
      } finally {
        await client.end();
      }
    });
