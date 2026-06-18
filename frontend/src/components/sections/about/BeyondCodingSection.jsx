import StickySidebarSection from '../../ui/StickySidebarSection.jsx';
import InfoCard from '../../cards/InfoCard.jsx';

const BEYOND_CODING_ITEMS = [
  {
    title: 'Sports & Leadership',
    description:
      'Beyond coding, I closely follow cricket and casually enjoy watching various sports like hockey and badminton. During school, I served as the Head Boy in Class XII, an experience that helped me develop leadership, responsibility, and communication skills.',
  },
  {
    title: 'Spirituality & Values',
    description:
      'I have a deep interest in spirituality and try to follow its values sincerely in daily life. I believe in maintaining meaningful and long-lasting relationships, balancing practical thinking with empathy and emotional understanding.',
  },
  {
    title: 'Teaching & Sharing',
    description:
      'Apart from development and problem solving, I enjoy teaching concepts I know to my friends and my younger brother. Sharing knowledge is something I genuinely find fulfilling, as it reinforces my own understanding while helping others grow.',
  },
];

export function BeyondCodingSection() {
  return (
    <StickySidebarSection
      title={<>Beyond<br />Coding</>}
      contentClassName="flex flex-col gap-8"
    >
      {BEYOND_CODING_ITEMS.map((item) => (
        <InfoCard key={item.title} {...item} />
      ))}
    </StickySidebarSection>
  );
}

export default BeyondCodingSection;
