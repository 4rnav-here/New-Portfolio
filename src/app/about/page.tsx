import { getPortfolioData } from '@/lib/parseInfo';
import { AboutSection } from '@/components/sections/AboutSection';

export default async function AboutPage() {
  const data = await getPortfolioData();
  return <AboutSection data={data} />;
}
