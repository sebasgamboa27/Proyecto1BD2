import { Mongoose } from "mongoose";
import { Constants, Logger } from "../common";

const Server = require('mongodb').Server;
const { MongoClient } = require("mongodb");

export class MongoDriver {

  private static instance : MongoDriver;

  public client : any
  public isOpen : boolean
  
  private constructor() { 
      const uri = "mongodb://25.9.119.89:27022,25.11.234.208:27022,25.10.118.245:27022";
      // Create a new MongoClient
      this.client = new MongoClient(uri);
      this.isOpen = false;
  }

  // Assumes the connection is already open
  public async write(pDatabase : string, pCollection : string, pDocument : any){
      try {
        const database = MongoDriver.instance.client.db(pDatabase);
        const collection = database.collection(pCollection);
        // create a document to be inserted
        const result = await collection.insertOne(pDocument);
        Logger.info(
          `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        );
    } catch (err) {
      Logger.error(err)
    }
  }

  public async openConnection() {
    await MongoDriver.instance.client.connect();

    Logger.info(Constants.CONNECTED_MSG)
  }

  public async closeConnection() {
    await MongoDriver.instance.client.close();
    
    MongoDriver.instance.isOpen = false;
    MongoDriver.instance = null
    
    Logger.info(Constants.CONNECTION_CLOSED)
  }

  public static getInstance() : MongoDriver {
    if (!MongoDriver.instance) {
      Logger.info("new instance")
      MongoDriver.instance = new MongoDriver();
    }
    
    if (!(MongoDriver.instance.isOpen)){
      MongoDriver.instance.openConnection()
      MongoDriver.instance.isOpen = true;
    }    
    return MongoDriver.instance;
  }
}