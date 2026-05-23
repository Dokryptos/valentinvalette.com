import { defineField, defineType } from "sanity";
import { ArchiveIcon } from "@sanity/icons";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const biographieType = defineType({
  name: "biographie",
  title: "Biographie",
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
    orderRankField({ type: "biographie" }),
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
      description: "The description of the biographie project (Obligation)",
    }),
    defineField({
      name: "photoProfil",
      title: "Photo de profil",
      type: "image",
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      options: {
        hotspot: true,
      },
      description:
        "The first image use for the presentation of the project (Obligation)",
    }),
  ],
});
