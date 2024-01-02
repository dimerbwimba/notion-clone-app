import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getSidebarCategories = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("categories")
      .withIndex("by_user", (q) =>
        q
          .eq("userId", userId)
          // .eq("parentDocument", args.parentDocument)
      )
      .filter((q) =>
        q.eq(q.field("isArchived"), false)
      )
      .order("desc")
      .collect();
    return documents;
  },
});

export const create = mutation({
    args: {
      name: v.string(),
      categoryId: v.optional(v.id("categories")),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const userId = identity.subject;
  
      const category = await ctx.db.insert("categories", {
        name: args.name,
        userId,
        isArchived: false,
        isPublished: false,
      });
  
      return category;
    },
  });
  
  export const getById = query({
    args:{
      Id: v.id("categories")
    },
    handler : async (ctx, args) =>{
      
      const identity = await ctx.auth.getUserIdentity();
  
      const category = await ctx.db.get(args.Id);
  
      if (!category) {
        throw new Error("Not found")
      }
  
      if (category.isPublished && !category.isArchived) {
        return category;
      }
  
      if (!identity) {
        throw new Error("Not Authenticated")
      }
  
      const userId = identity.subject;
  
      if (category.userId !== userId) {
        throw new Error("Unauthorized")
      } 
      
      return category;
  
    }
  })

  export const update = mutation({
    args:{
      id: v.id("categories"),
      name: v.optional(v.string()),
      content: v.optional(v.string()),
      coverImage: v.optional(v.string()),
      description: v.optional(v.string()),
      icon: v.optional(v.string()),
      isPublished : v.optional(v.boolean())
    },
    handler: async(ctx, args)=>{
  
      const identity = await ctx.auth.getUserIdentity()
  
      if (!identity) {
        throw new Error("Unauthorized")
      }
  
      const userId = identity.subject
  
      const { id , ...rest} = args
  
      const existingCategory = await ctx.db.get(args.id);
  
      if (!existingCategory) {
        throw new Error("Not found")
      }
  
      if (existingCategory.userId !== userId) {
        throw new Error("Unauthorized")
      }
  
      const category = await ctx.db.patch(args.id, {
        ...rest
      });
  
      return category;
  
    }
  });
  
  export const archive = mutation ({
    args:{ id : v.id("categories")},
    handler: async(ctx,args)=>{
      const identity = await ctx.auth.getUserIdentity();
    
        if (!identity) {
          throw new Error("Not authenticated");
        }
      const userId = identity.subject;
  
      const existingCategory =  await ctx.db.get(args.id);
  
      if (!existingCategory) {
        throw new Error("Not found")
      }
  
      if (existingCategory.userId !== userId) {
        throw new Error("Unauthorized")
      }
  
  
      const category = await ctx.db.patch(args.id,{
        isArchived:true
      })
  
  
      return category
    }
  });
  
  export const restoreTrashed = mutation({
    args: {
      id: v.id("categories")
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const userId = identity.subject;
  
      const existingCategory = await ctx.db.get(args.id);
  
      if (!existingCategory) {
        throw new Error("Not found");
      }
  
      if (existingCategory.userId !== userId) {
        throw new Error("Unauthorized");
      }
  
      const options: Partial<Doc<"categories">> = {
        isArchived: false
      };

  
      await ctx.db.patch(args.id, options);      
  
  
      const category = await ctx.db.patch(args.id,options)
  
      return category;
    }
  });

  export const getTrash = query({
    handler: async (ctx)=>{
      const identity = await ctx.auth.getUserIdentity();
    
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const userId = identity.subject;
    
      const categories = await ctx.db
        .query("categories")
        .withIndex("by_user",(q) => q.eq("userId",userId))
        .filter((q)=> q.eq(q.field("isArchived"), true))
        .order("desc")
        .collect()
  
      return categories;
    }
  });

  export const remove = mutation({
    args:{
      id:v.id("categories")
    },
    handler: async (ctx, args)=>{
      const identity = await ctx.auth.getUserIdentity();
    
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const userId = identity.subject;
  
      const existingCategory =  await ctx.db.get(args.id)
  
      if (!existingCategory) {
        throw new Error("Not found")
      }
  
      if (existingCategory.userId !== userId) {
        throw new Error("Unauthorized")
      }
  
      const category = await ctx.db.delete(args.id);
  
      return category;
    }
  });