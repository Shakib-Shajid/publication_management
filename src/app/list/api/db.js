import { MongoClient } from "mongodb";

const uri = "mongodb+srv://managePro:O7zHoTQdHPE7O0Ff@cluster0.pvn5rcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function connectToDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
    return client.db("schools");
}
