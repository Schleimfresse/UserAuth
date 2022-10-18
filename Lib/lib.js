import Datastore from "nedb";
const database = new Datastore("database.db");
const loadDatastore = database.loadDatabase();
const ROLES = ["user", "admin", "moderator"]

export {
    database,
    loadDatastore,
    ROLES,
}