import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Header from '../Components/Homepage/Header/Header';
import ImagesSection from '../Components/HostelPage/ImagesSection';
import Description from './../Components/HostelPage/Description';
import RatingReview from './../Components/HostelPage/RatingReview';

import { getHostel } from '../services/hostel';

function HostelPage() {
    const { id } = useParams();
    const [ hostel, setHostel ] = useState(null);

    useEffect(() => {
        getHostel(id).then((res) => {
            setHostel(res.data);
        })
    }, [])

  return (
    <div>
      { hostel &&
        <>
          <Header />
          <ImagesSection hostel={ hostel }/>
          <div className="hostel__details" style={{display: "flex", padding: "24px 48px"}}>
            <Description hostel={ hostel }/>
            <RatingReview hostel={ hostel }/>
          </div>
        </> }
    </div>
  )
}

export default HostelPage