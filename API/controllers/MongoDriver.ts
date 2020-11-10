import { Mongoose } from "mongoose";
import { Constants, Logger } from "../common";

const Server = require('mongodb').Server;
const { MongoClient } = require("mongodb");

export class MongoDriver {

    public client : any

    public constructor() { 
        const uri = "mongodb://25.9.119.89:27022,25.11.234.208:27022,25.10.118.245:27022";
        // Create a new MongoClient
        this.client = new MongoClient(uri);
    }

    public async write(pDatabase : string, pCollection : string, pDocument : any){
        try {
            await this.client.connect();
            Logger.info(Constants.CONNECTED_MSG)
            const database = this.client.db(pDatabase);
            const collection = database.collection(pCollection);
            // create a document to be inserted
            const result = await collection.insertOne(pDocument).readPreference('primaryPreferred');
            Logger.info(
              `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
            );
          } catch (err) {
            
            Logger.error(err)

          } finally {
            await this.client.close();
            Logger.error("Se cerró.")
          }
         
    }

}