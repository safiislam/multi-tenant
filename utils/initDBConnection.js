import mongoose from "mongoose";
import tenantSchema from "../schema/tenant";
import tenantUserSchema from "../schema/tenantUser";
import usersSchema from "../schema/users";

const clientOption = {
  socketTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set("debug", true);

const initAdminDbConnection = async (DB_URL) => {
  try {
    const db = mongoose.createConnection(DB_URL, clientOption);
    db.on("error", (err) => console.log("Admin db error: ", err));

    db.once("open", () => {
      console.log("Admin client MongoDB Connection ok!");
    });
    await db.model("tenants", tenantSchema);
    await db.model("tenantusers", tenantUserSchema);
    return db;
  } catch (error) {
    return error;
  }
};

const initTenantDBConnection = async (DB_URL, dbName) => {
  try {
    const db = mongoose.createConnection(DB_URL, clientOption);

    db.on("error", (err) => console.log(`Tenant ${dbName} db error: `, err));

    db.once("open", () => {
      console.log(`Tenant connection for ${dbName} MongoDB Connection ok!`);
    });

    await db.model("users", usersSchema);

    return db;
  } catch (error) {
    return error;
  }
};

export { initAdminDbConnection, initTenantDBConnection };
