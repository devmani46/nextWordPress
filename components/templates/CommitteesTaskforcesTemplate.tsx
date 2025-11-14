import { Page } from "@/lib/wordpress";

interface CommitteesTaskforcesProps {
  page: Page;
}

export default async function CommitteesTaskforcesTemplate({
  page,
}: CommitteesTaskforcesProps) {
  return (
    <div>
      <section className="trust m-auto flex w-[70%] gap-12">
        <div className="trust-text basis-1/2">
          <p className="h2">
            The Trust of Committees Taskforces & Subcommittees
          </p>
          <p className="p1-regular text-gray">
            he Non-Resident Nepali Association (NRNA) was born out of the
            diverse aspirations of the Nepali Diaspora. For many, it meant
            creating a global network of Nepalis abroad, strengthening emotional
            ties with the motherland, and supporting each other in foreign
            lands. For others, it was about encouraging investments in Nepal,
            fostering technical cooperation, and sharing professional expertise
            gained abroad. Equally important were advocacy goals such as the
            push for dual citizenship, easier travel to Nepal, and improved
            welfare for migrant workers. At the same time, there was a strong
            sense of responsibility toward Nepal’s socio-economic development —
            from philanthropic projects to job-creating investments and policy
            advocacy. These diverse needs and commitments gave birth to the
            system of committees, taskforces, and subcommittees that continue to
            guide NRNA’s work today. At the same time, there was a strong sense
            of responsibility toward Nepal’s socio-economic development from
            philanthropic projects to job-creating investments and policy
            advocacy.
          </p>
        </div>
        <div className="trust-images basis-1/2 rounded-2xl bg-gray"></div>
      </section>

      {/*WHY COMMITTEES EXIST */}

      <section className="our-vision mt-20 flex px-[15%]">
        <div className="everything-container flex h-[520px] w-full rounded-2xl bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)]">
          <div className="empty-test-block relative basis-1/2">
            <div className="red-block absolute -left-10 -top-6 h-[520px] w-[450px] rounded-2xl bg-blue-normal"></div>
          </div>
          <div className="text-block flex basis-1/2 flex-col gap-3 py-11 pr-20">
            <p className="p1-regular">Our Vision in Action</p>
            <p className="h3 text-blue-normal">Strategic Goals: </p>
            <p className="p1-regular text-gray">
              The Strategic Goals of NRNA is to unite and bring Nepali residing
              all over the world under one umbrella; protect and promote their
              interest in and outside Nepal and utilize their potentials and
              resources for the welfare of Nepal. To achieve these objectives
              the association shall conduct the following activities: Promote
              and protect the rights and interest of Nepalis residing outside
              Nepal Establish a global network and a common platform for Nepalis
              Diaspora Attract and facilitate NRNs investment including foreign
              direct investment (FDI) for economic and social development of
              Nepal Promote tourism and preserve Nepali culture and heritage
              globally Mobilize the knowledge, skills, capital and other
              resources within the disposal of NRNs for the socio economic
              development of Nepal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
