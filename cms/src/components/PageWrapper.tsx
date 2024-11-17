import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";

interface PageHeaderProps {
  breadcrumbs?: {
    title: string;
    url?: string;
  }[];
  children: React.ReactNode;
}

export const PageWrapper = ({ breadcrumbs, children }: PageHeaderProps) => {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        {breadcrumbs && (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => {
                  return (
                    <>
                      <BreadcrumbItem key={breadcrumb.title}>
                        {breadcrumb.url ? (
                          <BreadcrumbLink href={breadcrumb.url}>
                            {breadcrumb.title}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </>
        )}
      </header>
      <div className="p-8">{children}</div>
    </div>
  );
};
