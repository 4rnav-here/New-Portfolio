import { getPortfolioData } from '@/lib/parseInfo';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export default async function ProjectsPage() {
  const data = await getPortfolioData();
  return <ProjectsSection data={data} />;
}
