export const adaptCar = (car) => ({
  id: car._id,
  name: car.title,
  city: car.city,
  price: car.pricePerDay,
  image: car.image,
  type: car.brand,
  seats: car.seats,
  fuel: car.fuelType,
  transmission: car.transmission,
});
