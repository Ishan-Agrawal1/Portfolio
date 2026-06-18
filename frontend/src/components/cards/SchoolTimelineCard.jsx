export function SchoolTimelineCard() {
  return (
    <div className="bg-[#141414] p-12 rounded-2xl border border-white/5 relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-serif text-3xl mb-2">Schooling Timeline</h3>
          <p className="text-[#e9c176] font-sans">KENDRIYA VIDYALAYA NO.1 NEEMUCH (M.P.)</p>
        </div>
        <span className="font-mono text-[10px] bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">
          2012 - 2024
        </span>
      </div>

      <div className="space-y-6">
        <h2 className="font-mono text-[14px] text-gray-500 uppercase tracking-widest mt-12">CLASS 12<sup>th</sup></h2>
        <div className="flex flex-col gap-2">
          <p className='font-mono text-[14px]'>CENTRAL BOARD OF SECONDARY EDUCATION</p>
          <div className="flex gap-2 items-center">
            <p className='font-mono text-[12px]'>PERCENTAGE : 92.8%</p>
            <span className='font-mono text-[10px]  px-4 py-2 border border-white/10 uppercase tracking-widest ml-auto'>2023-24</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-mono text-[14px] text-gray-500 uppercase tracking-widest mt-12">CLASS 10<sup>th</sup></h2>
        <div className="flex flex-col gap-2">
          <p className='font-mono text-[14px]'>CENTRAL BOARD OF SECONDARY EDUCATION</p>
          <div className="flex gap-2 items-center">
            <p className='font-mono text-[12px]'>PERCENTAGE : 97.4%</p>
            <span className='font-mono text-[10px]  px-4 py-2 border border-white/10 uppercase tracking-widest ml-auto'>2021-22</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolTimelineCard;
