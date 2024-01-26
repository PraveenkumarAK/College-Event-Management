  import React from 'react'
  import img from '../assets/pexels-wendy-wei-1190298.jpg'
  import background from '../assets/jeremy-chevallier.jpg'

  export default function About() {
    return (
      <div style={{backgroundSize:'cover', backgroundImage: `url(${background})`}}>
      <div className='max-w-6xl py-14 px-4  mx-auto backdrop-blur-lg shadow-2xl rounded-lg h-full '>
          <h1 className='text-7xl font-bold mb-4 text-pink-600'>About Us</h1>
      <div className='flex gap-4'>
        <div className='max-sm:hidden'>
          <img src={img} alt="" className='h-[540px] w-[2300px]'/>
        </div>
        <div>
          <p className='mb-4 text-gray-300'>Orxganizing events at Karpagram College of Engineering involves a thoughtful and dynamic approach to meet the unique needs and interests of its engineering student community. With a foundation rooted in innovation and academic excellence, event management endeavors focus on integrating these values into various activities. The first paragraph of event planning involves understanding the pulse of the college, tailoring events to resonate with engineering students who are not only academically driven but also keen on experiences that bridge the gap between theory and practice. Collaborating with engineering clubs and organizations adds depth to events, bringing technical expertise, hands-on demonstrations, and a palpable sense of enthusiasm that aligns with the college's ethos.</p>
          <p className='mb-4 text-gray-300'>
            Effective budgeting and financial planning constitute the second paragraph of the event management process at Karpagram College of Engineering. Given the nature of engineering-focused events, which may include workshops, hackathons, and technical symposiums, organizers work closely with the college administration to allocate funds strategically. Exploring partnerships with industry sponsors, alumni, and technology firms ensures the availability of resources to facilitate cutting-edge events that not only enrich the academic experience but also provide networking opportunities for students to connect with professionals in their field.
          </p>
          <p className='mb-4 text-gray-300'>Promotion and engagement form the third paragraph of the event management strategy. Leveraging the college's technological prowess, organizers utilize social media, online platforms, and newsletters to disseminate information about upcoming events. With a focus on interactive elements such as robotics competitions, coding challenges, and guest lectures from industry experts, events at Karpagram College of Engineering are designed not only to educate but also to inspire innovation and collaboration. The aim is to create a dynamic and intellectually stimulating environment, fostering a strong sense of community among engineering students and leaving a lasting impact on their academic journey.</p>
        </div>
      </div>
      </div>
      </div>
    )
  }
