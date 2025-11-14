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

export default async function ExecutiveCommitteeTemplate({
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

      <section className="hierarchy">
        <div className="member-card">
          <div className="member-image" />
          <p>Dr. Badri K.C.</p>
          <p>President | IES | Russia</p>
        </div>
      </section>

      <section className="banner-container mt-28">
        <BannerTwo />
      </section>
    </div>
  );
}
