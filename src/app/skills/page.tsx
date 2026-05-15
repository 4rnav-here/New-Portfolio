import { getPortfolioData } from '@/lib/parseInfo';
import { SkillsSection } from '@/components/sections/SkillsSection';

export default async function SkillsPage() {
  const data = await getPortfolioData();
  return <SkillsSection data={data} />;
}
