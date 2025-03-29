"use strict";
// Airtable service functions to interact with the 'Sneakers', 'Designs', and 'Products' tables in Airtable.
// Functions include fetching sneaker by slug, getting design categories, and fetching product types.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductTypes = exports.getDesignCategories = exports.getSneakerBySlug = exports.syncAirtableToSupabase = exports.fetchAirtableData = void 0;
const airtable_1 = __importDefault(require("airtable"));
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const airtableBase = new airtable_1.default({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID);
const tableNames = process.env.AIRTABLE_TABLE_NAMES.split(',');
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const SNEAKERS_TABLE = 'Sneakers';
const DESIGNS_TABLE = 'Designs';
const PRODUCTS_TABLE = 'Products';
const fetchAirtableData = (tableName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield airtableBase(tableName).select().all();
        return records.map(record => (Object.assign({ id: record.id }, record.fields)));
    }
    catch (error) {
        console.error(`Error fetching data from Airtable table ${tableName}:`, error);
        return [];
    }
});
exports.fetchAirtableData = fetchAirtableData;
const syncAirtableToSupabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Starting sync process...");
        for (const tableName of tableNames) {
            console.log(`Fetching data from Airtable table: ${tableName}`);
            const airtableData = yield (0, exports.fetchAirtableData)(tableName);
            console.log(`Fetched ${airtableData.length} records from ${tableName}`);
            for (const item of airtableData) {
                const { id } = item, fields = __rest(item, ["id"]);
                console.log(`Syncing record ${id} to Supabase table: ${tableName}`);
                const { error } = yield supabase
                    .from(tableName)
                    .upsert([Object.assign({ id }, fields)], { onConflict: 'id' });
                if (error) {
                    console.error(`Error inserting record ${id} into ${tableName}:`, error);
                }
                else {
                    console.log(`Successfully inserted record ${id} into ${tableName}`);
                }
            }
        }
        console.log('All data successfully synced from Airtable to Supabase');
    }
    catch (error) {
        console.error('Error syncing data to Supabase:', error);
    }
});
exports.syncAirtableToSupabase = syncAirtableToSupabase;
// Function to fetch a sneaker by its slug
const getSneakerBySlug = (sneakerSlug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield airtableBase(SNEAKERS_TABLE)
            .select({
            filterByFormula: `{MK Shopify Handle} = '${sneakerSlug}'`,
            maxRecords: 1,
        })
            .firstPage();
        if (records.length === 0) {
            return null;
        }
        return records[0].fields;
    }
    catch (error) {
        console.error('Error fetching sneaker:', error);
        throw new Error('Failed to fetch sneaker');
    }
});
exports.getSneakerBySlug = getSneakerBySlug;
// Function to fetch all design categories
const getDesignCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield airtableBase(DESIGNS_TABLE).select({ fields: ['Name'] }).all();
        return records.map(record => ({ id: record.id, name: record.fields.Name }));
    }
    catch (error) {
        console.error('Error fetching design categories:', error);
        throw new Error('Failed to fetch design categories');
    }
});
exports.getDesignCategories = getDesignCategories;
// Function to fetch all product types
const getProductTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield airtableBase(PRODUCTS_TABLE)
            .select({ fields: ['Name', 'Regular Price', 'Sale Price'] })
            .all();
        return records.map(record => ({
            id: record.id,
            name: record.fields['Name'],
            regularPrice: record.fields['Regular Price'] || null,
            salePrice: record.fields['Sale Price'] || null,
        }));
    }
    catch (error) {
        console.error('Error fetching product types:', error);
        throw new Error('Failed to fetch product types');
    }
});
exports.getProductTypes = getProductTypes;
// CORRECTED previous file
// // Airtable service functions to interact with the 'Sneakers', 'Designs', and 'Products' tables in Airtable.
// // Functions include fetching sneaker by slug, getting design categories, and fetching product types.
// import Airtable from 'airtable';
// import dotenv from 'dotenv';
// dotenv.config();
// const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
// const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
// const SNEAKERS_TABLE = 'Sneakers';
// const PRODUCTS_TABLE = 'Products';
// if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID) {
//   throw new Error('Missing Airtable credentials. Please set AIRTABLE_ACCESS_TOKEN and AIRTABLE_BASE_ID in your .env file.');
// }
// const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(AIRTABLE_BASE_ID);
// // Function to fetch a sneaker by its slug
// export const getSneakerBySlug = async (sneakerSlug: string) => {
//   try {
//     const records = await base(SNEAKERS_TABLE)
//       .select({
//         filterByFormula: `{MK Shopify Handle} = '${sneakerSlug}'`,
//         maxRecords: 1,
//       })
//       .firstPage();
//     if (records.length === 0) {
//       return null;
//     }
//     return records[0].fields;
//   } catch (error) {
//     console.error('Error fetching sneaker:', error);
//     throw new Error('Failed to fetch sneaker');
//   }
// };
// // Function to fetch all design categories
// export const getDesignCategories = async () => {
//   try {
//     const records = await base('Designs').select({ fields: ['Name'] }).all();
//     const categories = records.map(record => ({
//       id: record.id,
//       name: record.fields.Name,
//     }));
//     return categories;
//   } catch (error) {
//     console.error('Error fetching design categories:', error);
//     throw new Error('Failed to fetch design categories');
//   }
// };
// // Function to fetch all product types
// export const getProductTypes = async () => {
//   try {
//     const records = await base(PRODUCTS_TABLE)
//       .select({ fields: ['Name', 'Regular Price', 'Sale Price'] }) // Include Regular Price and Sale Price
//       .all();
//     const productTypes = records.map(record => ({
//       id: record.id,
//       name: record.fields['Name'],
//       regularPrice: record.fields['Regular Price'] || null, // Ensure no undefined values
//       salePrice: record.fields['Sale Price'] || null,
//     }));
//     return productTypes;
//   } catch (error) {
//     console.error('Error fetching product types:', error);
//     throw new Error('Failed to fetch product types');
//   }
// };
//FAULATED
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
