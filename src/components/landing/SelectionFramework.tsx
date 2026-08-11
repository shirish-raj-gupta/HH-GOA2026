import React from 'react';

export const SelectionFramework: React.FC = () => {
  const phases = [
    {
      phase: 'Open Trials',
      when: 'August 2026',
      purpose: 'Skill-based challenges open to everyone.',
      badge: 'STAGE ONE',
      bg: 'bg-goa-gold text-goa-green-deep border-goa-green-deep',
      accent: 'text-goa-green-deep/70',
    },
    {
      phase: 'Partner Trials',
      when: 'September 2026',
      purpose: 'Selection based on each partner\'s requirements and interests.',
      badge: 'STAGE TWO',
      bg: 'bg-goa-pink text-white border-white',
      accent: 'text-white/80',
    },
    {
      phase: 'RSVP & Stake',
      when: 'Late September',
      purpose: 'Final confirmation of your team\'s participation by staking.',
      badge: 'CONFIRMATION',
      bg: 'bg-goa-gold text-goa-green-deep border-goa-green-deep',
      accent: 'text-goa-green-deep/70',
    },
    {
      phase: 'Residency',
      when: '28–31 Oct 2026',
      purpose: '247 builders come together to build, ship, and launch in Goa.',
      badge: 'GOA BEACH',
      bg: 'bg-goa-pink text-white border-white',
      accent: 'text-white/80',
    },
  ];

  const rules = [
    { num: '1', title: 'TEAMS OF 1 TO 3', desc: 'The team is the unit of selection. Solo builders are welcome too.' },
    { num: '2', title: 'EVERYONE SUBMITS', desc: 'Each member completes and submits the same task on their own.' },
    { num: '3', title: 'ALL OR NOTHING', desc: 'A team is selected only when every member has submitted and passed.' },
    { num: '4', title: 'TRY AS OFTEN AS YOU LIKE', desc: 'Missed a task? Try the next one. Keep going until you are in.' },
  ];

  const criteria = [
    { title: 'Proof of building', desc: 'Shipped projects, repositories, hackathon results. What you have built matters more than what you say.' },
    { title: 'Task performance', desc: 'How you actually solve the task. This is the main signal.' },
    { title: 'Clear thinking', desc: 'The ability to reason about problems worth solving. You do not need a finished idea to apply.' },
    { title: 'Drive to be there', desc: 'A real wish to take part. With limited seats, this makes a difference.' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 py-10 space-y-12">
      {/* SECTION HEADER */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="font-mono text-xs text-goa-pink uppercase tracking-widest font-extrabold">
          SELECTION FRAMEWORK & TIMELINE
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-black text-goa-gold uppercase tracking-tight leading-none">
          THE ROAD TO 247
        </h2>
        <p className="font-body text-base sm:text-lg text-[#F5F0E1]/80 max-w-xl mx-auto pt-1">
          How builders earn a seat at Hacker House Goa 2026. A rolling challenge, not a waiting list.
        </p>
      </div>

      {/* THE MODEL HIGHLIGHT BANNER */}
      <div className="bg-[#072414] border-2 border-goa-gold rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-3 text-center sm:text-left max-w-4xl mx-auto overflow-hidden">
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-goa-gold" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-goa-gold" />
        
        <div className="font-mono text-xs text-goa-gold uppercase tracking-widest font-bold">
          ✦ THE MODEL
        </div>
        <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
          EVERYONE BUILDS. NO ONE IS JUST WATCHING.
        </h3>
        <p className="font-body text-sm sm:text-base text-[#F5F0E1]/85 leading-relaxed">
          Instead of filling one application and waiting for the result, you earn your spot by completing different skill-based tasks. New tasks open one after another. If you miss one, you can still try the next. Keep participating until your whole team is in.
        </p>
      </div>

      {/* TIMELINE AT A GLANCE (4 CARDS GRID) */}
      <div className="space-y-4">
        <div className="font-mono text-xs text-goa-gold uppercase tracking-widest font-bold text-center">
          ✦ THE TIMELINE AT A GLANCE
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((p, idx) => (
            <div
              key={idx}
              className={`${p.bg} border-3 p-5 rounded-2xl relative shadow-2xl flex flex-col justify-between h-52 transform hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="absolute -top-3 left-4 w-3.5 h-3.5 rounded-full border-2 border-white bg-current" />
              <div className="absolute -top-3 right-4 w-3.5 h-3.5 rounded-full border-2 border-white bg-current" />

              <div>
                <div className={`font-mono text-[10px] font-bold uppercase tracking-wider mb-1 ${p.accent}`}>
                  {p.badge} · {p.when}
                </div>
                <h4 className="font-display font-black text-2xl uppercase leading-tight">
                  {p.phase}
                </h4>
              </div>

              <div className={`font-mono text-xs font-bold border-t-2 border-current/20 pt-2 ${p.accent}`}>
                {p.purpose}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STAGE RULES & SELECTION CRITERIA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: How a team clears an Open Trial */}
        <div className="lg:col-span-6 bg-[#072414] border-2 border-goa-gold/60 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl relative">
          <div className="font-mono text-xs text-goa-gold uppercase tracking-widest font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-goa-pink rounded-full" />
            <span>HOW A TEAM CLEARS AN OPEN TRIAL</span>
          </div>

          <div className="space-y-4">
            {rules.map((r) => (
              <div key={r.num} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-xl bg-goa-pink text-white font-display font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                  {r.num}
                </div>
                <div>
                  <h5 className="font-display font-black text-lg text-goa-gold uppercase tracking-tight">
                    {r.title}
                  </h5>
                  <p className="font-body text-xs text-[#F5F0E1]/80 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-goa-pink/15 border border-goa-pink p-3.5 rounded-xl font-mono text-xs text-goa-pink font-bold text-center">
            ✦ Every selected builder, not just team leads, has personally cleared a task. Quality is set at the door.
          </div>
        </div>

        {/* Right: What We Look For / Criteria */}
        <div className="lg:col-span-6 bg-[#072414] border-2 border-goa-gold/60 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl relative">
          <div className="font-mono text-xs text-goa-gold uppercase tracking-widest font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-goa-gold rounded-full" />
            <span>CRITERIA & YOUR SEAT</span>
          </div>

          <div className="space-y-4">
            {criteria.map((c, i) => (
              <div key={i} className="border-b border-goa-gold/20 pb-3 last:border-b-0 last:pb-0">
                <h5 className="font-display font-black text-lg text-white uppercase tracking-tight mb-0.5">
                  {c.title}
                </h5>
                <p className="font-body text-xs text-[#F5F0E1]/80 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-goa-gold/10 border border-goa-gold/40 p-3.5 rounded-xl font-mono text-xs text-goa-gold font-bold text-center">
            ✦ RSVP & Stake: In late September, seats are confirmed by staking to lock in commitment.
          </div>
        </div>
      </div>
    </section>
  );
};
