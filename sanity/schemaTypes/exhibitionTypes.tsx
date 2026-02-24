import { defineField, defineType } from "sanity";
import { ArchiveIcon } from "@sanity/icons";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const exhibitionType = defineType({
  name: "exhibition",
  title: "Exhibition",
  type: "document",
  icon: ArchiveIcon,
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
    orderRankField({ type: "exhibition" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      description: "The title of the project (Obligation)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      description: "The description of the exhibition project (Obligation)",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      description: "The year the project was created (Obligation)",
    }),
  ],
});
