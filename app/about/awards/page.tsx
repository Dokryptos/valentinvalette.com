import { getAwardsProjects } from "@/sanity/queries";

export default async function AwardsPage({}) {
  const awards = await getAwardsProjects();
  return (
    <div>
      {awards.map((award) => (
        <div
          className="flex gap-4 mb-4 text-[11px] xl:text-[15px] font-SuisseIntl"
          key={award._id}
        >
          <span>{award.year}</span>
          <p>{award.description}</p>
        </div>
      ))}
    </div>
  );
}
