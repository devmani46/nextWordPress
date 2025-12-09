import Image from "next/image";

interface GalleryProps {
  image_list: string[];
}

export default function GalleryGrid({ image_list }: GalleryProps) {
  return (
    <section className="mb-20 px-[15%]">
      <div className="grid grid-cols-9 grid-rows-3 gap-6">
        <div className="relative col-span-3 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[0]} alt={image_list[0]} layout="fill" />
        </div>

        <div className="relative col-span-2 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[1]} alt={image_list[1]} layout="fill" />
        </div>

        <div className="relative col-span-2 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[2]} alt={image_list[2]} layout="fill" />
        </div>

        <div className="relative col-span-2 h-40 overflow-hidden rounded-xl bg-white p-4">
          <button className="hover:bg-gray-100 absolute right-2 top-2 rounded-full p-1">
            ☰
          </button>
          <Image src={image_list[3]} alt={image_list[3]} layout="fill" />
        </div>

        <div className="relative col-span-2 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[4]} alt={image_list[4]} layout="fill" />
        </div>

        <div className="relative col-span-3 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[5]} alt={image_list[5]} layout="fill" />
        </div>

        <div className="relative col-span-2 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[6]} alt={image_list[6]} layout="fill" />
        </div>

        <div className="relative col-span-2 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[7]} alt={image_list[7]} layout="fill" />
        </div>

        <div className="relative col-span-2 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[8]} alt={image_list[8]} layout="fill" />
        </div>

        <div className="relative col-span-2 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[9]} alt={image_list[9]} layout="fill" />
        </div>

        <div className="relative col-span-3 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[10]} alt={image_list[10]} layout="fill" />
        </div>

        <div className="relative col-span-2 h-40 overflow-hidden rounded-xl p-4">
          <Image src={image_list[11]} alt={image_list[11]} layout="fill" />
        </div>
      </div>
    </section>
  );
}
