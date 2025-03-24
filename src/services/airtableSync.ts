// Airtable service functions to interact with the 'Sneakers', 'Designs', and 'Products' tables in Airtable.
// Functions include fetching sneaker by slug, getting design categories, and fetching product types.

import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const SNEAKERS_TABLE = 'Sneakers';
const PRODUCTS_TABLE = 'Products';

if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID) {
  throw new Error('Missing Airtable credentials. Please set AIRTABLE_ACCESS_TOKEN and AIRTABLE_BASE_ID in your .env file.');
}

const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(AIRTABLE_BASE_ID);

// Function to fetch a sneaker by its slug
export const getSneakerBySlug = async (sneakerSlug: string) => {
  try {
    const records = await base(SNEAKERS_TABLE)
      .select({
        filterByFormula: `{MK Shopify Handle} = '${sneakerSlug}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    return records[0].fields;
  } catch (error) {
    console.error('Error fetching sneaker:', error);
    throw new Error('Failed to fetch sneaker');
  }
};

// Function to fetch all design categories
export const getDesignCategories = async () => {
  try {
    const records = await base('Designs').select({ fields: ['Name'] }).all();

    const categories = records.map(record => ({
      id: record.id,
      name: record.fields.Name,
    }));

    return categories;
  } catch (error) {
    console.error('Error fetching design categories:', error);
    throw new Error('Failed to fetch design categories');
  }
};

// Function to fetch all product types
export const getProductTypes = async () => {
  try {
    const records = await base(PRODUCTS_TABLE)
      .select({ fields: ['Name', 'Regular Price', 'Sale Price'] }) // Include Regular Price and Sale Price
      .all();

    const productTypes = records.map(record => ({
      id: record.id,
      name: record.fields['Name'],
      regularPrice: record.fields['Regular Price'] || null, // Ensure no undefined values
      salePrice: record.fields['Sale Price'] || null,
    }));

    return productTypes;
  } catch (error) {
    console.error('Error fetching product types:', error);
    throw new Error('Failed to fetch product types');
  }
};

  



// import Airtable from 'airtable';
// import { AppDataSource } from '../db';
// import { User } from '../entities/User';
// import { Profile } from '../entities/Profile';
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
// const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
// const USERS_TABLE = 'users';
// const PROFILES_TABLE = 'profiles';

// if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID) {
//   throw new Error('Missing Airtable credentials. Please set AIRTABLE_ACCESS_TOKEN and AIRTABLE_BASE_ID in your .env file.');
// }

// const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(AIRTABLE_BASE_ID);

// // Fetch Airtable Schema (Checks API Access)
// export const fetchBaseSchema = async () => {
//   try {
//     const url = `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`;
//     const response = await axios.get(url, {
//       headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
//     });

//     console.log('Airtable Base Schema:');
//     response.data.tables.forEach((table: any) => {
//       console.log(`Table: ${table.name}`);
//       table.fields.forEach((field: any) => console.log(`- ${field.name} (${field.type})`));
//     });
//   } catch (error: any) {
//     console.error('Airtable Schema Fetch Error:', error.response?.data || error.message);
//   }
// };

// // Sync Users to Airtable
// export const syncUsersToAirtable = async () => {
//     try {
//       const userRepository = AppDataSource.getRepository(User);
//       const users = await userRepository.find();
  
//       if (users.length === 0) {
//         console.log('No users to sync.');
//         return;
//       }
  
//       await Promise.all(users.map(user =>
//         base(USERS_TABLE).create([
//           {
//             fields: {
//               username: user.username,
//               name: user.name,
//               firstName: user.firstName,
//               lastName: user.lastName,
//               emailAddress: user.emailAddress,
//               phoneNumber: user.phoneNumber,
//               role: user.role,
//               location: user.location || '',
//               profilePicture: user.profilePicture || '',
//               status: user.status ? 'Active' : 'Inactive', // Ensure you're using valid values for status
//             },
//           },
//         ])
//       ));
  
//       console.log('Users successfully synced to Airtable.');
//     } catch (error) {
//       console.error('Error syncing users to Airtable:', error);
//     }
//   };
  
// // Sync Profiles to Airtable
// export const syncProfilesToAirtable = async () => {
//     try {
//       const profileRepository = AppDataSource.getRepository(Profile);
//       const profiles = await profileRepository.find();
  
//       if (profiles.length === 0) {
//         console.log('No profiles to sync.');
//         return;
//       }
  
//       await Promise.all(profiles.map(profile =>
//         base(PROFILES_TABLE).create([
//           {
//             fields: {
//               username: profile.username,
//               name: profile.name,
//               firstName: profile.firstName,
//               lastName: profile.lastName,
//               emailAddress: profile.emailAddress,
//               phoneNumber: profile.phoneNumber,
//               role: profile.role,
//               location: profile.location || '',
//               profilePicture: profile.profilePicture || '',
//               status: profile.status ? 'Active' : 'Inactive', // Ensure you're using valid values for status
//             },
//           },
//         ])
//       ));
  
//       console.log('Profiles successfully synced to Airtable.');
//     } catch (error) {
//       console.error('Error syncing profiles to Airtable:', error);
//     }
//   };
  
