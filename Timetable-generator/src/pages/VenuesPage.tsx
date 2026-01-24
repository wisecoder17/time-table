import React from "react";
import VenueList from "../VenueList";

/**
 * Institutional Infrastructure Asset Page
 * Orchestrates the management of academic venues and spatial resources.
 */
const VenuesPage: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Institutional Header Section */}
      <div className="border-b border-brick/10 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-institutional-primary tracking-tight mb-2">
            Infrastructure Assets
          </h1>
          <p className="text-institutional-secondary font-medium italic opacity-80">
            Venue Management • Spatial Resources
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brick">
            Bells University
          </p>
          <p className="text-xs font-bold text-institutional-muted">
            Technology & Innovation
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-brick/20" />
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-brick">
              Infrastructure Portfolio
            </h2>
          </div>
          <VenueList />
        </section>
      </div>
    </div>
  );
};

export default VenuesPage;
