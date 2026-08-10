import { ChatSection } from '@/components/sections/ChatSection';

// No server-side data fetching here — the resume context is injected
// server-side inside /api/chat instead, so this page just renders the
// (client-side) chat UI.
export default function ChatPage() {
  return <ChatSection />;
}
