const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Client } = require("pg");

admin.initializeApp();

exports.GetDatabaseData = functions
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
        const AGE_RATE_2024 = await client.query('SELECT * FROM "AGE_RATE_2024";');
        const YOUNG_ADULT_CANCER_TREND = await client.query('SELECT * FROM "YOUNG_ADULT_CANCER_TREND";');

        return { AGE_RATE_2024: AGE_RATE_2024.rows, YOUNG_ADULT_CANCER_TREND:YOUNG_ADULT_CANCER_TREND.rows};
    
      } catch (err) {
        console.error('Database connection or query error:', err.stack);
      } finally {
        await client.end();
      }
    });
