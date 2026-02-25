import { getWritingProjects } from "@/sanity/queries";

export default async function WritingsPage({}) {
  const writings = await getWritingProjects();
  return (
    <div>
      {writings.map((writing) => (
        <div
          className="flex gap-4 mb-4 text-[11px] xl:text-[15px] font-SuisseIntl"
          key={writing._id}
        >
          <span>{writing.year}</span>
          <p>{writing.description}</p>
        </div>
      ))}
    </div>
  );
}
