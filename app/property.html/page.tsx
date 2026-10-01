import { redirect } from 'next/navigation';

export default async function LegacyPropertyPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id = 'lagos-1' } = await searchParams;
  redirect(`/properties/${encodeURIComponent(id)}`);
}
