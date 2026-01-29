"use client";

import Project from "@/types/project";

interface HomeProps {
  projects: Project[];
}

export default function HomeComponent({ projects }: HomeProps) {
  return (
    <main>
      <div>
        {projects.map((project, index) => (
          <div className="font-SuisseIntl" key={project._id}>
            <span className="text-[15px] md:text-[11px] lg:text-[15px]">
              {index < 10 ? `0${index}` : index}
            </span>
            <div>
              <h2 className="font-PPeditorialNew text-[28px] md:text-[18px] lg:text-[28px]">
                {project.title}
              </h2>
              <div className="text-[15px] md:text-[11px] lg:text-[15px]">
                <span>{project.category}</span>
                <span className="pr-1 pl-1">/</span>
                <span>{project.gallery.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
