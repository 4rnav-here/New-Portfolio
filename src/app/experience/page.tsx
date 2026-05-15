import { getPortfolioData } from '@/lib/parseInfo';
import { ExperienceSection } from '@/components/sections/ExperienceSection';

export default async function ExperiencePage() {
  const data = await getPortfolioData();
  return <ExperienceSection data={data} />;
}
