import { getPortfolioData } from '@/lib/parseInfo';
import { ContactSection } from '@/components/sections/ContactSection';

export default async function ContactPage() {
  const data = await getPortfolioData();
  return <ContactSection data={data} />;
}
