import React from 'react'
import styled from 'styled-components'

import { MdSignalWifi3BarLock } from 'react-icons/md'
import { MdOutlineOutlet } from 'react-icons/md'
import { BiCctv } from 'react-icons/bi'
import { MdLocalLaundryService } from 'react-icons/md'
import { BiWater } from 'react-icons/bi'
import { FaParking } from 'react-icons/fa'
import { HiHomeModern } from 'react-icons/hi2'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const Amenities = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    &>h1 {
        font-size: 1rem;
    }
`

const AmenitiesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const Amenity = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    &>span {
        font-size: 1rem;
        font-weight: 600;
    }
`

const HostelAmenities = ({ hostelInfo }) => {
    const [amenities, setAmenities] = React.useState([])
    const amenitiesList = [
        {
            value: 'Wifi',
            icon: <MdSignalWifi3BarLock color='#A761CC' size={34}/>
        },
        {
            value: '24hr Electricity',
            icon: <MdOutlineOutlet color='#A761CC' size={34}/>
        },
        {
            value: 'CCTV',
            icon: <BiCctv color='#A761CC' size={34}/>
        },
        {
            value: 'Laundry',
            icon: <MdLocalLaundryService color='#A761CC' size={34} />
        },
        { 
            value: 'Hotwater',
            icon: <BiWater color='#A761CC' size={34} />
        },
        { 
            value: 'Parking',
            icon: <FaParking color='#A761CC' size={34} />
        },
        { 
            value: 'Terrace',
            icon: <HiHomeModern color='#A761CC' size={34} />
        },
    ]

  return (
    <Container>
        <Amenities>
            <h1>Amenities we offer</h1>
            <AmenitiesContainer>
                {amenitiesList.map((amenity, index) => {
                    if (hostelInfo.amenities.includes(amenity.value)) {
                        return (
                            <Amenity key={index}>
                                {amenity.icon}
                                <span>{amenity.value}</span>
                            </Amenity>
                        )
                    }
                })} 
            </AmenitiesContainer>
        </Amenities>
    </Container>
  )
}

export default HostelAmenities