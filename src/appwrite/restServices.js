import { Client,Databases,ID,Query,Storage } from "appwrite";
import config from "../config/config";


export class Services {
    client = new Client();
    database;
    storage;
    constructor(){
        this.client
                  .setEndpoint(config.appwriteUrl)
                  .setProject(config.appwriteProjectId)
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

  async createPost({title,slug,content,featuredImage,status,userId}){
       try {
        await this.database.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )
        
       } catch (error) {
         console.log("Error from createPost:",error);
       }
  }

  async updatePost(slug, {title,content,featuredImage,status,userId}){
       try {
      return  await this.database.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )
        
       } catch (error) {
         console.log("Error from createPost:",error);
       }
  }

  async deletePost(slug){
       try {
       await  this.database.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
     );
     return true
        
       } catch (error) {
        console.log("Error from deletePost:",error);
        return false
       }
  }
  async getPost(slug){
       try {
    return   await  this.database.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
     );
        
       } catch (error) {
        console.log("Error from deletePost:",error);
        return false
       }
  }

  async getPosts(queries =[Query.equal("status", "active")]){
     try {
        return this.database.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries,
        )
        
     } catch (error) {
        console.log("Error from getPosts",error);
        
     }
  }
 
  // upload file method

  async uploadFile(file){
      try {
        await this.storage.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
        
      } catch (error) {
        console.log("Error from uploadFile:",error);
         return false
      }
  }

  async deleteFile(fileId){
     try {
        await this.storage.deleteFile(config.appwriteBucketId,fileId);
        return true;
        
     } catch (error) {
        console.log("Error from deleteFile:",error);
        return false;
     }
  }

  getFilePreview(fileId){
  return  this.storage.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
  }
}

const services = new services();

export default services