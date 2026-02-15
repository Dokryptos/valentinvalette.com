import { type SchemaTypeDefinition } from "sanity";

import { projectType } from "./projectType";
import { awardType } from "./awardTypes";
import { bookType } from "./bookTypes";
import { exhibitionType } from "./exhibitionTypes";
import { writingType } from "./writingTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, awardType, bookType, exhibitionType, writingType],
};
