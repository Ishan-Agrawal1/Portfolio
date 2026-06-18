import { Code2, Terminal } from 'lucide-react';
import StickySidebarSection from '../../ui/StickySidebarSection.jsx';
import PhilosophyCard from '../../cards/PhilosophyCard.jsx';

const PHILOSOPHY_ITEMS = [
  {
    title: 'Problem Solving',
    icon: Code2,
    description:
      'Competitive programming has strengthened my analytical thinking and approach to solving complex problems efficiently. I enjoy optimizing solutions while maintaining readability and clean implementation.',
  },
  {
    title: ' Development',
    icon: Terminal,
    description:
      'I build modern full-stack applications focused on performance, scalability, and clean user experiences using technologies like React, Node.js, MongoDB, and Socket.IO.',
  },
  {
    title: ' Learning',
    icon: Terminal,
    description:
      "I'm currently exploring blockchain development, real-time applications, and AI-powered systems while continuing to improve my development and problem-solving skills.",
  },
];

export function PhilosophySection() {
  return (
    <StickySidebarSection
      title={<>Technical <br /> Philosophy</>}
      subtitle="What I Focus On"
      contentClassName="flex flex-col gap-8"
    >
      {PHILOSOPHY_ITEMS.map((item) => (
        <PhilosophyCard key={item.title} {...item} />
      ))}
    </StickySidebarSection>
  );
}

export default PhilosophySection;
