import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";


export const archive = mutation ({
  args:{ id : v.id("documents")},
  handler: async(ctx,args)=>{
    const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Not authenticated");
      }
    const userId = identity.subject;

    const existingDocument =  await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const recursiveArchive = async ( documentId: Id<"documents">)=>{
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent",(q)=>(
          q
            .eq("userId", userId)
            .eq("parentDocument" , documentId)
        ))
        .collect()

        for(const child of children){
          await ctx.db.patch(child._id,{
            isArchived:true
          });
          await recursiveArchive(child._id)
        }
    }

    const document = await ctx.db.patch(args.id,{
      isArchived:true
    })

    recursiveArchive(args.id)

    return document
  }
});

export const getSidebar = query({
    args: {
      parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const userId = identity.subject;
  
      const documents = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q
            .eq("userId", userId)
            .eq("parentDocument", args.parentDocument)
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
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const getTrash = query({
  handler: async (ctx)=>{
    const identity = await ctx.auth.getUserIdentity();
  
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
  
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user",(q) => q.eq("userId",userId))
      .filter((q)=> q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect()

    return documents
  }
});

export const restoreTrashed = mutation({
  args: {
    id: v.id("documents")
  },
  handler: async (ctx, args) => {
    // 1. Get the user identity from the authentication context
    const identity = await ctx.auth.getUserIdentity();

    // 2. Check if the user is authenticated
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // 3. Extract the user ID from the identity
    const userId = identity.subject;

    // 4. Retrieve the existing document from the database using the provided ID
    const existingDocument = await ctx.db.get(args.id);

    // 5. Check if the document exists
    if (!existingDocument) {
      throw new Error("Not found");
    }

    // 6. Check if the user is authorized to restore the document
    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // 7. Define options to update the document and mark it as not archived
    const options: Partial<Doc<"documents">> = {
      isArchived: false
    };

    // 8. Check if the existing document has a parent document
    if (existingDocument.parentDocument) {
      // 9. Retrieve the parent document from the database
      const parent = await ctx.db.get(existingDocument.parentDocument);

      // 10. If the parent document is archived, remove the reference to it
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    // 11. Update the document in the database with the specified options
    await ctx.db.patch(args.id, options);

    // 12. Define a recursive function to restore all children of the document
    const recursiveRestore = async (documentId: Id<"documents">) => {
      // 13. Query and collect all children of the current document
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) => (
          q
            .eq("userId", userId)
            .eq("parentDocument", documentId)
        ))
        .collect();

      // 14. Iterate over each child and recursively restore it
      for (const child of children) {
        // 15. Update the child document to mark it as not archived
        await ctx.db.patch(child._id, {
          isArchived: false
        });

        // 16. Recursively restore the child's children
        await recursiveRestore(child._id);
      }
    };


    const document = await ctx.db.patch(args.id,options)

    // 17. Invoke the recursive restore function to restore all children
    recursiveRestore(args.id);

    // 18. Return the existing document after restoration
    return document;
  }
});

export const remove = mutation({
  args:{
    id:v.id("documents")
  },
  handler: async (ctx, args)=>{
    const identity = await ctx.auth.getUserIdentity();
  
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument =  await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error("Not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const document = await ctx.db.delete(args.id);

    return document;
  }
});

export const getSearch = query({
  handler: async (ctx)=>{
    const identity = await ctx.auth.getUserIdentity();
  
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId",userId))
      .filter((q)=>
        q.eq(q.field("isArchived"), false),
      ).order("desc").collect();
      
      return documents
  }
})