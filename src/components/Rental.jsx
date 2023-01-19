import React, { useState } from "react";

const Rental = ({ rental }) => {
  const [rentalInfo, setRentalInfo] = useState(rental);

  return (
    <div>
      { rental ? (
        <div>
        <p>ID: {rentalInfo.rentalId}</p>
        <p>Start Date: {rentalInfo.startDate}</p>
          <p>End Date: {rentalInfo.endDate}</p>
          <p>Deposit: {rentalInfo.deposit}</p>
          <p>Price Annual: {rentalInfo.priceAnnual}</p>
          <p>
            Contact Person: {rentalInfo.contactPersonDto.name}
          </p>
          <p>
            Contact Phone: {rentalInfo.contactPersonDto.phone}
          </p>
          <p>
            Address: {rentalInfo.houseDto.address}
          </p>
          <p>
            City: {rentalInfo.houseDto.cityInfoDto.cityName}
          </p>
          <p>
            Zip: {rentalInfo.houseDto.cityInfoDto.zip}
          </p>
          <p>
            Number of rooms: {rentalInfo.houseDto.numberOfRooms}
          </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );

};

export default Rental;
