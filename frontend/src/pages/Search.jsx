import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/Listingitem';
import background from '../assets/jeremy-chevallier.jpg'

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');

    if (
      searchTermFromUrl ||
      typeFromUrl 
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/backend/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
  if (e.target.id === 'all' || 
    e.target.id === 'TechnicalEvent' || 
    e.target.id === 'Workshops' || 
    e.target.id === 'CulturalEvent' || 
    e.target.id === 'Cooking' || 
    e.target.id === 'FoodShops' || 
    e.target.id === 'GamingEvent' || 
    e.target.id === 'ArtEvent')
   {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);;
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/backend/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row text-white" style={{backgroundSize:'cover', backgroundImage: `url(${background})`}}>
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen max-[380px]:text-base">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full text-black max-[380px]:h-8 max-[380px]:w-48"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="md:flex-1 max-sm:flex gap-2 flex-wrap items-center font-semibold">
            <label>Type:</label>
            <div className="flex gap-2 md:px-9 md:py-1">
              <input type="checkbox" id="all" className="w-5 max-[380px]:w-4" onChange={handleChange} checked={sidebardata.type === 'all'} />
              <span>All Events</span>
            </div>
            <div className="flex gap-2 md:px-9 md:py-1">
              <input type="checkbox" id="TechnicalEvent" className="w-5 max-[380px]:w-4" onChange={handleChange} checked={sidebardata.type === 'TechnicalEvent'} />
              <span>Technical Event</span>
            </div>
            <div className="flex gap-2 md:px-9 md:py-1">
              <input type="checkbox" id="Workshops" className="w-5 max-[380px]:w-4" onChange={handleChange} checked={sidebardata.type === 'Workshops'} />
              <span>Workshops</span>
            </div>
            <div className="flex gap-2 md:px-9 md:py-1">
              <input type="checkbox" id="CulturalEvent" className="w-5 max-[380px]:w-4" onChange={handleChange} checked={sidebardata.type === 'CulturalEvent'} />
              <span>Cultural Event</span>
            </div>
            <div className="flex gap-2 md:px-9 md:py-1">
              <input type="checkbox" id="Cooking" className="w-5 max-[380px]:w-4" onChange={handleChange} checked={sidebardata.type === 'Cooking'} />
              <span>Cooking</span>
            </div>
            <div className="flex gap-2 md:px-9 md:py-1">
              <input type="checkbox" id="FoodShops" className="w-5 max-[380px]:w-4" onChange={handleChange} checked={sidebardata.type === 'FoodShops'} />
              <span>FoodShops</span>
            </div>
            <div className="flex gap-2 md:px-9 md:py-1">
              <input type="checkbox" id="GamingEvent" className="w-5 max-[380px]:w-4" onChange={handleChange} checked={sidebardata.type === 'GamingEvent'} />
              <span>Gaming Event</span>
            </div>
            <div className="flex gap-2 md:px-9 md:py-1">
              <input type="checkbox" id="ArtEvent" className="w-5 max-[380px]:w-4" onChange={handleChange} checked={sidebardata.type === 'ArtEvent'} />
              <span>Art Event</span>
            </div>
          </div>
          <button className='bg-transparent w-64 self-center text-white text-xl font-medium p-2 cursor-pointer rounded-lg border border-white hover:bg-white duration-300 hover:text-black max-[380px]:h-9 max-[380px]:w-48 flex items-center justify-center max-[380px]:text-base'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl  font-semibold border-b p-3 mt-5 max-[380px]:text-lg max-[768px]:border-hidden'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4 max-[380px]:gap-8'>
          {!loading && listings.length === 0 && (
            <p className='text-xl'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-center w-full'>
              Loading...
            </p>
          )}
          
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-white hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

