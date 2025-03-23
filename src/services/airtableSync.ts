import Airtable from "airtable";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";

const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const USERS_TABLE = "users"; // Adjust if your table name is different
const PROFILES_TABLE = "profiles";

if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID) {
  throw new Error("Miss ing Airtable credentials. Please set AIRTABLE_ACCESS_TOKEN and AIRTABLE_BASE_ID in your .env file.");
}

const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(AIRTABLE_BASE_ID);

const syncUsersToAirtable = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  for (const user of users) {
    await base(USERS_TABLE).create([
      {
        fields: {
          username: user.username,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          phoneNumber: user.phoneNumber,
          role: user.role,
          location: user.location || "",
          profilePicture: user.profilePicture || "",
          status: user.status,
        },
      },
    ]);
  }

  console.log("Users synced to Airtable");
};

const syncProfilesToAirtable = async () => {
  const profileRepository = AppDataSource.getRepository(Profile);
  const profiles = await profileRepository.find();

  for (const profile of profiles) {
    await base(PROFILES_TABLE).create([
      {
        fields: {
          username: profile.username,
          name: profile.name,
          firstName: profile.firstName,
          lastName: profile.lastName,
          emailAddress: profile.emailAddress,
          phoneNumber: profile.phoneNumber,
          role: profile.role,
          location: profile.location || "",
          profilePicture: profile.profilePicture || "",
          status: profile.status,
        },
      },
    ]);
  }

  console.log("Profiles synced to Airtable");
};

export { syncUsersToAirtable, syncProfilesToAirtable };
