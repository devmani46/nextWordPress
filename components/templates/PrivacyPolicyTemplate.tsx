import { PrivacyPolicyPage } from "@/lib/wordpress";
import parse from "html-react-parser";

interface PrivacyPolicyTemplateProps {
  page: PrivacyPolicyPage;
}

export default function PrivacyPolicyTemplate({
  page,
}: PrivacyPolicyTemplateProps) {
  const { title, content, policy_items } = page;

  return (
    <div className="container mx-auto px-4 py-8 md:px-[15%]">
      {/* Header */}
      <h1 className="h2 mb-4 text-black">{title.rendered}</h1>

      {/* Main Content / Intro */}
      {content.rendered && (
        <div className="prose mb-8 max-w-none text-gray-600">
          {parse(content.rendered)}
        </div>
      )}

      {/* Policy Items */}
      {policy_items && policy_items.length > 0 && (
        <div className="flex flex-col gap-8">
          {policy_items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="h4 font-bold text-gray-800">{item.title}</h3>
              <div className="prose max-w-none text-gray-600">
                {parse(item.description)}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
