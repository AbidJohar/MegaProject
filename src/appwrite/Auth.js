import config from "../config/config";
import { Client, Account,ID} from 'appwrite';

export class AuthService{
    client = new Client;
    account;
    constructor(){
        this.client
                  .setEndpoint(config.appwriteUrl)
                  .setProject(config.appwriteProjectId)

                  this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
          const userAccount =   await this.account.create(ID.unique(),email, name);
              if (userAccount) {
                  return this.loginAccount({email,password});
              } else {
                return userAccount;
              }
            
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
          return  await this.account.createEmailPasswordSession(email,password);
        
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try{
          const getUser =  await this.account.get();
          if(getUser){
            return getUser;
          }else{
            return null;
          }
        }
        catch(error){
            console.log("error from getCurrentUser:",error);
        }
    }
    
    async logout(){
        try {
          return  await this.account.deleteSessions();
            
        } catch (error) {
            
            console.log("error from logout:",error);
        }
    }
}



const authService  = new AuthService()

export default authService