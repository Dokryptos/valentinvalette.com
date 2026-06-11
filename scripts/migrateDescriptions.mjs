import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

const client = createClient({
  projectId: "abdablkd",
  dataset: "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

function key() {
  return randomBytes(5).toString("hex");
}

function stringToBlocks(text) {
  return text.split("\n\n").map((paragraph) => ({
    _type: "descriptionBlock",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: paragraph, marks: [] }],
  }));
}

const projects = await client.fetch(
  `*[_type == "project"]{_id, title, description}`,
);

const toMigrate = projects.filter((p) => typeof p.description === "string" && p.description.trim());

console.log(`${toMigrate.length} projets à migrer sur ${projects.length} trouvés`);

for (const project of toMigrate) {
  const blocks = stringToBlocks(project.description);
  await client.patch(project._id).set({ description: blocks }).commit();
  console.log(`✓ ${project.title}`);
}

console.log("Migration terminée.");
