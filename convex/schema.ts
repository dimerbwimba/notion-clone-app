import { defineSchema, defineTable } from "convex/server";
import {v} from "convex/values"

export default defineSchema({
    documents : defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived:v.boolean(),
        parentDocument:v.optional(v.id("documents")),
        content:v.optional(v.string()),
        coverImage : v.optional(v.string()),
        icon:v.optional(v.string()),
        parentCategory: v.optional(v.id("categories")),
        description: v.optional(v.string()),
        isPublished: v.boolean()
    })
    .index("by_user",["userId"])
    .index("by_user_parent",["userId", "parentDocument"]),

    categories : defineTable({
        name: v.string(),
        userId: v.string(),
        isArchived:v.boolean(),
        content:v.optional(v.string()),
        coverImage : v.optional(v.string()),
        icon:v.optional(v.string()),
        description: v.optional(v.string()),
        isPublished: v.boolean()
    }).index("by_user",["userId"]),
})

