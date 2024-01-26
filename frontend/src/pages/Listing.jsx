import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { RiShareForwardFill } from "react-icons/ri";
import Query from "../components/Query";
import { useSelector } from "react-redux";
import background from '../assets/jeremy-chevallier.jpg'

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState(false);
  const [showWinnerListingsError, setShowWinnerListingsError] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/backend/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleShowWinnerListings = async () => {
    try {
      setShowWinnerListingsError(false);
      const res = await fetch(`/backend/user/listings/${currentUser}`);
      const data = await res.json();
      if (data.success === false) {
        setShowWinnerListingsError(true);
        return;
      }
    } catch (error) {
      return setShowWinnerListingsError(true);
    }
  };

  return (
    <main className="text-white" style={{backgroundSize:'cover', backgroundImage: `url(${background})`}}>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className=" backdrop-blur-lg  shadow-2xl ">
        <div className="p-1 max-w-lg mx-auto  h-full max-[690px]:w-72 max-sm:mt-0">
          <div>
            <Swiper navigation className="mt-2">
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[250px] max-[690px]:h-52"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "400px",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            <p className="fixed top-[3%] right-[37%] z-10 max-[690px]:right-[3%] max-[690px]:h-5  max-[690px]:w-5  w-6 h-6 flex justify-center bg-blackitems-center cursor-pointer">
              <RiShareForwardFill  
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </p>
            {copied && (
              <p className="fixed top-[8%] right-[5%] z-10 rounded-md bg-black p-1">
                Link copied!
              </p>
            )}
          </div>
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 text-center'>
            <p className="text-4xl font-bold  max-[690px]:text-lg text-white">{listing.name}</p>


            <p className="text-white font-light font-serif text-lg  max-[690px]:text-xs">
              <span className="font-semibold text-white">Category - </span>
              {listing.type === 'TechnicalEvent' ?
                'TechnicalEvent' : listing.type === 'Workshops' ?
                  'Workshops' : listing.type === 'CulturalEvent' ?
                    'CulturalEvent' : listing.type === 'Cooking' ?
                      'Cooking' : listing.type === 'FoodShops' ?
                        'FoodShops' : listing.type === 'GamingEvent' ?
                          'GamingEvent' : listing.type === 'ArtEvent' ?
                            'ArtEvent' : ''
              }
            </p>

            <p className="text-white font-light font-serif text-lg max-[690px]:text-xs">
              <span className="font-semibold text-white">Block - </span>
              {listing.block}
            </p>

            <p className="text-white font-light font-serif text-lg max-[690px]:text-xs">
              <span className="font-semibold text-white">Venue - </span>
              {listing.venue}
            </p>

            <p className="text-white font-light font-serif text-lg max-[690px]:text-xs">
              <span className="font-semibold text-white">
                Starting-Date-Time -{" "}
              </span>
              {listing.startingDateTime}
            </p>

            <p className="text-white font-light font-serif text-lg max-[690px]:text-xs">
              <span className="font-semibold text-white">
                Ending-Date-Time -{" "}
              </span>
              {listing.endingDateTime}
            </p>

            <p className="text-white font-light font-serif text-lg max-[690px]:text-xs">
              {/* <span className="font-semibold text-white max-[690px]:hidden">Description -</span> */}
              <p className="text-sm line-clamp-10  max-[690px]:text-xs">{listing.description}</p>
            </p>

            <button onClick={handleShowWinnerListings} className="text-white w-full hover:underline">
              Winner
            </button>

            {showWinnerListingsError && (
              <div className="flex flex-col self-center text-white font-serif text-xl items-center">
                <p>{listing.winner}</p> 
              </div>
            )}

            {currentUser && listing.userRef !== currentUser._id && !query && (
              <div className="flex self-center">
                <button
                  onClick={() => setQuery(true)}
                  className='bg-transparent w-64  text-white text-xl font-medium p-2 cursor-pointer rounded-lg border border-white hover:bg-white duration-300 hover:text-black'
                >
                  Querys
                </button>
              </div>
            )}
            {query && <Query listing={listing} />}

          </div>
        </div>
      </div>
      )}
    </main>
  );
}
