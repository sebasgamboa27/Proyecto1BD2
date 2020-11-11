import { Mongoose } from "mongoose";
import { Constants, Logger } from "../common";

const Server = require('mongodb').Server;
const { MongoClient } = require("mongodb");

export class MongoDriver {

  private static instance : MongoDriver;

  public client : any
  
  private constructor() { 
      const uri = `mongodb://25.9.119.89:27022,25.11.234.208:27022,25.10.118.245:27022/?poolSize=${Constants.POOL_SIZE}`;
      // Create a new MongoClient
      this.client = new MongoClient(uri);
      this.openConnection(this.client)
  }

  // Assumes the connection is already open
  public async write(pDatabase : string, pCollection : string, pDocument : any){
      try {
        const database = MongoDriver.instance.client.db(pDatabase);
        const collection = database.collection(pCollection);
        // create a document to be inserted
        
        collection.insertOne(pDocument).then((result : any) => {
          Logger.info(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
          );
        });

    } catch (err) {
      Logger.error(err)
    }
  }

  private openConnection(pClient : any) {
    pClient.connect()
    .then(() => {
      Logger.info(Constants.CONNECTED_MSG)
    })
    .catch((error : any) => {
      Logger.error(error)
    });
  }

  public closeConnection() {
    this.client.close()
    .then(() => {
      MongoDriver.instance = null
      Logger.info(Constants.CONNECTION_CLOSED)
    })
    .catch((error : any) => {
      Logger.error(error)
    });

  }

  public static getInstance() : MongoDriver {
    if (!MongoDriver.instance) {
      Logger.info("new instance")
      MongoDriver.instance = new MongoDriver();
    }
    return MongoDriver.instance;
  }
}