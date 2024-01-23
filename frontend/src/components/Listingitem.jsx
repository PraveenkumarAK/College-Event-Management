 import { Link } from "react-router-dom";

 export default function Listingitem({listing}) {
   return ( 
   <div className="backdrop-blur-3xl hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[330px] max-[380px]:w-[140px] max-[380px]:h-[220px] ">
     <Link to={`/listing/${listing._id}`}>
         <img src={listing.imageUrls[0] ||
            'https://www.ctvnews.ca/content/dam/ctvnews/en/images/2020/8/13/party-1-5063738-1627388863273.jpg'
          } alt='lisitng cover'
         className="h-[220px] w-full object-cover hover:scale-105 translate-scale duration-300 max-[380px]:h-[140px]"
         />
         <div className="p-3 flex flex-col gap-2 w-full">
           <p className="truncate text-lg font-semibold text-center max-[380px]:text-sm">{listing.name}</p>
           <div>
             <p className="text-center max-[380px]:text-sm">( {listing.type} )</p>
           </div>
           <div>
             <p className='text-sm line-clamp-2 max-[380px]:hidden'>{listing.description}</p>
           </div>
         </div>
     </Link>
   </div>
   )
 }

