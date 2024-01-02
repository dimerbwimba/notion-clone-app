import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";


export const blogDoc = query({
    handler: async (ctx) =>{
      const documents = await ctx.db
      .query("documents")
      .filter((q) =>
        q.eq(q.field("isPublished"), true)
      )
      .order("desc")
      .collect();
  
    return documents;
    }
  })
  