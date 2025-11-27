import { Page } from "@/lib/wordpress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import CircleFollowCard from "../banner/fw-banner";
import BannerTwo from "../banner/banner2";

interface ExecutiveCommitteeTemplateProps {
  page: Page;
}

export default function ExecutiveCommitteeTemplate({
  page,
}: ExecutiveCommitteeTemplateProps) {
  return (
    <div>
      <header className="m-auto flex w-[70%] justify-between">
        <p className="h2">Executive Committee</p>
        <div className="dropdowns flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Tenure</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Group</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <Button variant="outline">Team Type </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <section className="hierarchy mt-6 flex flex-col gap-4 px-[15%]">
        <div className="row flex justify-center">
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
        </div>
        <div className="row flex justify-center gap-4">
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
        </div>
        <div className="row flex justify-center gap-4">
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
          <div className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
            <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray" />
            <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
            <p className="label-regular">President | IES | Russia</p>
          </div>
        </div>
      </section>

      <section className="banner-container mt-28">
        <BannerTwo />
      </section>
    </div>
  );
}
