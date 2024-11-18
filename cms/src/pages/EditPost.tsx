import { PageWrapper } from "@/components/PageWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";

export const EditPost = () => {
  const { id = "" } = useParams<{ id: string }>();
  return (
    <div>
      <PageWrapper
        breadcrumbs={[
          {
            title: "Posts",
            url: "/posts",
          },
          {
            title: id,
          },
        ]}
      >
        <div className="flex flex-col gap-4">
          <Input placeholder="Title" />
          <Textarea placeholder="Content" rows={30} />
        </div>
      </PageWrapper>
    </div>
  );
};
