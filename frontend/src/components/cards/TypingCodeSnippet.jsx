import React from 'react';
import { motion } from 'motion/react';

export function TypingCodeSnippet() {
  const [text, setText] = React.useState('');
  const code = `while(problemExists) {\n    analyze();\n    optimize();\n    build();\n}`;

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(code.slice(0, index));
      index++;
      if (index > code.length) {
        clearInterval(interval);
      }
    }, 75);
    return () => clearInterval(interval);
  }, []);

  const highlightCode = (str) => {
    return str
      .replace(/while/g, '<span class="text-pink-500">while</span>')
      .replace(/analyze/g, '<span class="text-blue-400">analyze</span>')
      .replace(/optimize/g, '<span class="text-green-400">optimize</span>')
      .replace(/build/g, '<span class="text-[#e9c176]">build</span>');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="hidden lg:block w-full max-w-sm ml-auto bg-[#141414] border border-white/5 p-8 rounded-2xl relative shadow-2xl"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#e9c176]/10 to-transparent rounded-bl-full pointer-events-none" />
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
      </div>
      <pre className="font-mono text-[15px] leading-loose text-gray-300 m-0">
        <span dangerouslySetInnerHTML={{ __html: highlightCode(text) }} />
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-2.5 h-4 bg-[#e9c176] ml-1 align-middle"
        />
      </pre>
    </motion.div>
  );
}

export default TypingCodeSnippet;
