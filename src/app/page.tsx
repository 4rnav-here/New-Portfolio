import { getPortfolioData } from '@/lib/parseInfo';
import { HomeSection } from '@/components/sections/HomeSection';

export default async function Home() {
  const data = await getPortfolioData();
  return <HomeSection data={data} />;
}
