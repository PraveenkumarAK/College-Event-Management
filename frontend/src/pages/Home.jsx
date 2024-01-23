import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Listingitem from "../components/Listingitem";

export default function Home() {
  const [technicalEventListings, setTechnicalEventListings] = useState([]);
  const [workshopsListings, setWorkshopsListings] = useState([]);
  const [culturalEventListings, setCulturalEventListings] = useState([]);
  const [cookingListings, setCookingListings] = useState([]);
  const [foodShopsListings, setFoodShopsListings] = useState([]);
  const [gamingEventListings, setGamingEventListings] = useState([]);
  const [artEventListings, setArtEventListings] = useState([]);
  SwiperCore.use([Navigation]);
  
  useEffect( ()=>{
      const fetchTechnicalEventListings = async () =>{
        try {
          const res = await fetch('/backend/listing/get?type=TechnicalEvent&limit=4');
          const data = await res.json();
          setTechnicalEventListings(data);
          fetchWorkshopsListings();
        } catch (error) {
          console.log(error);
        }
      }

      const fetchWorkshopsListings = async () =>{
        try {
          const res = await fetch('/backend/listing/get?type=Workshops&limit=4');
          const data = await res.json();
          setWorkshopsListings(data);
          fetchCulturalEventListings();
        } catch (error) {
          console.log(error);
        }
      }

      const fetchCulturalEventListings = async () =>{
        try {
          const res = await fetch('/backend/listing/get?type=CulturalEvent&limit=4');
          const data = await res.json();
          setCulturalEventListings(data);
          fetchCookingListings();
        } catch (error) {
          console.log(error);
        }
      }

      const fetchCookingListings = async () =>{
        try {
          const res = await fetch('/backend/listing/get?type=Cooking&limit=4');
          const data = await res.json();
          setCookingListings(data);
          fetchFoodShopsListings();
        } catch (error) {
          console.log(error);
        }
      }

      const fetchFoodShopsListings = async () =>{
        try {
          const res = await fetch('/backend/listing/get?type=FoodShops&limit=4');
          const data = await res.json();
          setFoodShopsListings(data);
          fetchGamingEventListings();
        } catch (error) {
          console.log(error);
        }
      }

      const fetchGamingEventListings = async () =>{
        try {
          const res = await fetch('/backend/listing/get?type=GamingEvent&limit=4');
          const data = await res.json();
          setGamingEventListings(data);
          fetchArtEventListings();
        } catch (error) {
          console.log(error);
        }
      }

      const fetchArtEventListings = async () =>{
        try {
          const res = await fetch('/backend/listing/get?type=ArtEvent&limit=4');
          const data = await res.json();
          setArtEventListings(data);
        } catch (error) {
          console.log(error);
        }
      }

      fetchTechnicalEventListings();
  },[]);
  return (
    <div>
    <div className="flex flex-col gap-6 text-pink-600 p-28 px-3 max-w-6xl mx-auto" >
        <h1 className="font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-pink-300">events</span> 
          <br/>
          place to enjoy
        </h1>
        <div className="text-xs sm:text-sm text-slate-300 ">
          Karpagam event management will help you find your events fast,easy and comfortable.
          <br/>
          Our expert support are always available.
        </div> 
        <Link to={'/search'} className="text-xs sm:text-sm font-bold hover:underline text-pink-500">
          Let's Start now...
        </Link>
      </div>

      <Swiper navigation>
      {artEventListings &&
        artEventListings.length > 0 &&
        artEventListings.map((listing) => (
          <SwiperSlide>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[550px] w-full max-[380px]:h-[290px]'
              key={listing._id}
              ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {technicalEventListings && technicalEventListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-pink-600 max-[380px]:text-2xl font-serif'>Recent technicalEvent</h2>
              <Link className='text-sm text-pink-300 hover:underline font-serif' to={'/search?offer=true'}>Show more technicalEvent</Link>
            </div>
            <div className='flex flex-wrap gap-12 text-white justify-evenly'>
              {technicalEventListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
       {workshopsListings && workshopsListings.length > 0 && (
         <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-pink-600 max-[380px]:text-2xl font-serif'>Recent places for workshops</h2>
              <Link className='text-sm text-pink-300 hover:underline font-serif' to={'/search?type=technicalEvent'}>Show more places for workshops</Link>
            </div>
            <div className='flex flex-wrap gap-12 text-white justify-evenly'>
              {workshopsListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
                ))}
            </div>
          </div>
        )}

        {culturalEventListings && culturalEventListings.length > 0 && (
         <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-pink-600 max-[380px]:text-2xl font-serif'>Recent places for culturalEvent</h2>
              <Link className='text-sm text-pink-300 hover:underline font-serif' to={'/search?type=technicalEvent'}>Show more places for culturalEvent</Link>
            </div>
            <div className='flex flex-wrap gap-12 text-white justify-evenly'>
              {culturalEventListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
                ))}
            </div>
          </div>
        )}

        {cookingListings && cookingListings.length > 0 && (
         <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-pink-600 max-[380px]:text-2xl font-serif'>Recent places for cooking</h2>
              <Link className='text-sm text-pink-400 hover:underline font-serif' to={'/search?type=technicalEvent'}>Show more places for cooking</Link>
            </div>
            <div className='flex flex-wrap gap-12 text-white justify-evenly'>
              {cookingListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
                ))}
            </div>
          </div>
        )}

      {foodShopsListings && foodShopsListings.length > 0 && (
         <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-pink-600 max-[380px]:text-2xl font-serif'>Recent places for foodShops</h2>
              <Link className='text-sm text-pink-300 hover:underline font-serif' to={'/search?type=technicalEvent'}>Show more places for foodShops</Link>
            </div>
            <div className='flex flex-wrap gap-12 text-white justify-evenly'>
              {foodShopsListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
                ))}
            </div>
          </div>
        )}

        {gamingEventListings && gamingEventListings.length > 0 && (
         <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-pink-600 max-[380px]:text-2xl font-serif'>Recent places for gamingEvent</h2>
              <Link className='text-sm text-pink-300 hover:underline font-serif' to={'/search?type=technicalEvent'}>Show more places for gamingEvent</Link>
            </div>
            <div className='flex flex-wrap gap-12 text-white justify-evenly'>
              {gamingEventListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
                ))}
            </div>
          </div>
        )}

        {artEventListings && artEventListings.length > 0 && (
         <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-pink-600 max-[380px]:text-2xl font-serif'>Recent places for artEvent</h2>
              <Link className='text-sm text-pink-300 hover:underline font-serif' to={'/search?type=technicalEvent'}>Show more places for artEvent</Link>
            </div>
            <div className='flex flex-wrap gap-12 text-white justify-evenly'>
              {artEventListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
                ))}
            </div>
          </div>
        )}
        </div>
        </div>
  )
}
