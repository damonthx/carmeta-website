import React from 'react';
import { ShieldCheck, Fuel, Disc, Settings2, ExternalLink } from 'lucide-react';

export interface Vehicle {
  vin: string;
  dealer_id?: string;
  make: string;
  model: string;
  trim?: string;
  drive_type?: string;
  transmission?: string;
  year: number;
  stock_number?: string;
  interior_type?: string;
  interior_color?: string;
  exterior_color?: string;
  cylinders?: string;
  cost?: number;
  wholesale?: number;
  retail_price?: number;
  internet_price?: number;
  mileage?: number;
  purchase_date?: string;
  video_url?: string;
  options?: string[];
  images?: string[];
  last_modified_date?: string;
  body_type?: string;
  engine?: string;
  mpg_city?: number;
  mpg_highway?: number;
  new_used?: string;
  msrp?: number;
  image_last_modified_date?: string;
  comments?: string;
  certified_pre_owned?: boolean;
  vehicle_link?: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  // Fallback price logic: Prefer Internet Price -> Retail Price -> MSRP -> 'Contact Us'
  const displayPrice =
    vehicle.internet_price && vehicle.internet_price > 0
      ? vehicle.internet_price
      : vehicle.retail_price && vehicle.retail_price > 0
      ? vehicle.retail_price
      : vehicle.msrp && vehicle.msrp > 0
      ? vehicle.msrp
      : null;

  // Image logic: Get first image, or use a premium unsplash automotive placeholder
  const thumbnail =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images[0]
      : 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80';

  return (
    <div 
      onClick={() => onSelect && onSelect(vehicle)}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      {/* Badge container */}
      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-1.5">
        {vehicle.new_used && (
          <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {vehicle.new_used}
          </span>
        )}
        {vehicle.certified_pre_owned && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            <ShieldCheck size={12} />
            Certified
          </span>
        )}
      </div>

      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img 
          src={thumbnail} 
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} 
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback if the image URL fails to load
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
      </div>

      {/* Details container */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <div className="mb-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {vehicle.make}
          </div>
          <h3 className="line-clamp-1 text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
            {vehicle.year} {vehicle.model}
            {vehicle.trim && <span className="ml-1 text-sm font-semibold text-slate-500">{vehicle.trim}</span>}
          </h3>
        </div>

        {/* Specs Pill Grid */}
        <div className="mb-5 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2 border border-slate-100/50">
            <Disc size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} mi` : 'N/A mi'}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2 border border-slate-100/50">
            <Settings2 size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">{vehicle.transmission || 'Automatic'}</span>
          </div>
          {vehicle.engine && (
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2 border border-slate-100/50 col-span-2">
              <Fuel size={13} className="text-slate-400 shrink-0" />
              <span className="truncate">{vehicle.engine} {vehicle.drive_type && `• ${vehicle.drive_type}`}</span>
            </div>
          )}
        </div>

        {/* Price & Link */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Price
            </div>
            <div className="text-xl font-black text-slate-900">
              {displayPrice ? `$${displayPrice.toLocaleString()}` : 'Contact Us'}
            </div>
          </div>
          
          <button 
            type="button"
            className="flex items-center justify-center rounded-full bg-slate-900 p-2.5 text-white transition-all duration-300 group-hover:bg-[#29abe2] group-hover:scale-105"
          >
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
