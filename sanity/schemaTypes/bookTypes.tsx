import { defineArrayMember, defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const bookType = defineType({
  name: "book",
  title: "Book",
  type: "document",
  icon: BookIcon,

  orderings: [orderRankOrdering],
  fieldsets: [
    {
      name: "misc",
      title: "Misc",
      options: {
        columns: 3,
      },
    },
  ],
  fields: [
    orderRankField({ type: "book" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      description: "The title of the project (Obligation)",
    }),
    defineField({
      name: "contenu",
      title: "Contenu",
      type: "array",
      of: [
        defineArrayMember({
          name: "singleImage",
          title: "Photo seule",
          type: "image",
        }),
        defineArrayMember({
          name: "doubleImage",
          title: "Deux photos",
          type: "object",
          fields: [
            { name: "image1", title: "Image 1", type: "image" },
            { name: "image2", title: "Image 2", type: "image" },
          ],
        }),
        defineArrayMember({
          name: "descriptionBlock",
          title: "Description",
          type: "block",
        }),
      ],
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      description: "The description of the book project (Obligation)",
    }),
  ],
});
