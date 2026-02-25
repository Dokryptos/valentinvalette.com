import Image from "next/image";
import photoProfil from "@/public/photoProfil.png";

export default function BiographiePage() {
  return (
    <div className="h-screen">
      <p>
        Valentin Valette est né en 1994 dans les Pyrénées-Atlantiques.
        Auteur-photographe français d’origine algérienne, il est également
        doctorant en anthropologie visuelle. Il est basé entre les Pyrénées, le
        Maghreb et le Golfe persique.
      </p>
      <div className="fixed bottom-4 right-4">
        <Image
          src={photoProfil}
          alt="Photo de profil de Valentin Valette"
          className="w-[170px] md:w-[360px] lg:w-[250px] xl:w-[230px] h-auto"
        />
      </div>
    </div>
  );
}
