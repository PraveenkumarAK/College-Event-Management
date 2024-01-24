 import { Link } from "react-router-dom";

 export default function Listingitem({listing}) {
   return ( 
  <div className="backdrop-blur-3xl hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[330px] max-[749px]:w-[320px] max-[729px]:w-[310px] max-[709px]:w-[300px] max-[689px]:w-[290px] max-[668px]:w-[280px] max-[648px]:w-[270px] max-[628px]:w-[260px] max-[607px]:w-[250px] max-[589px]:w-[240px] max-[568px]:w-[230px]  max-[549px]:w-[220px] max-[528px]:w-[210px] max-[508px]:w-[200px] max-[489px]:w-[190px] max-[468px]:w-[180px] max-[448px]:w-[170px] max-[428px]:w-[160px] max-[408px]:w-[150px] max-[388px]:w-[140px] max-[380px]:w-[130px]">
     <Link to={`/listing/${listing._id}`}>
         <img src={listing.imageUrls[0] ||
            'https://www.ctvnews.ca/content/dam/ctvnews/en/images/2020/8/13/party-1-5063738-1627388863273.jpg'
          } alt='lisitng cover'
         className="h-[220px] w-full object-cover hover:scale-105 translate-scale duration-300 max-[709px]:h-[200px] max-[528px]:h-[180px] max-[489px]:h-[180px] max-[468px]:h-[180px] max-[549px]:h-[180px] max-[448px]:h-[160px] max-[408px]:h-[140px] max-[380px]:h-[130px] "
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

