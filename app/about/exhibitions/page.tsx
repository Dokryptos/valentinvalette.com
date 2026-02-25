import { getExhibitionsProjects } from "@/sanity/queries";

export default async function ExhibitionsPage({}) {
  const exhibitions = await getExhibitionsProjects();
  return (
    <div>
      {exhibitions.map((exhibition) => (
        <div
          className="flex gap-4 mb-4 text-[11px] xl:text-[15px] font-SuisseIntl"
          key={exhibition._id}
        >
          <span>{exhibition.year}</span>
          <p>{exhibition.description}</p>
        </div>
      ))}
    </div>
  );
}
